/* eslint-disable @typescript-eslint/no-explicit-any */
import orderRepository from '../repositories/order.repository';
import cartRepository from '../repositories/cart.repository';
import userRepository from '../repositories/user.repository';
import sepayService from './payment/sepay.service';
import prisma from '../libs/prisma';

const toRelativePath = (url?: string | null): string | null => {
  if (!url || typeof url !== 'string') return null;
  let clean = url.trim();
  if (clean.startsWith('http://localhost:3000')) {
    clean = clean.replace('http://localhost:3000', '');
  } else if (clean.startsWith('http://127.0.0.1:3000')) {
    clean = clean.replace('http://127.0.0.1:3000', '');
  } else {
    clean = clean.replace(/^https?:\/\/[^\/]+/i, '');
  }
  return clean;
};

export class OrderService {
  /**
   * Tạo mã đơn hàng duy nhất dạng VELxxxxxx
   */
  private generateOrderCode(): string {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return `VEL${randomNum}`;
  }

  /**
   * Tự động trừ số lượng tồn kho (stock) của từng sản phẩm khi đơn hàng được thanh toán thành công
   */
  async deductProductStock(orderId: string) {
    try {
      const order = await orderRepository.findById(orderId);
      if (!order || !order.orderItems || order.orderItems.length === 0) return;

      for (const item of order.orderItems) {
        if (item.productId) {
          const qty = Number(item.quantity) || 1;
          const sizeStr = item.productSize ? String(item.productSize).trim() : null;

          if (sizeStr) {
            // Tìm biến thể theo productId và size
            const variant = await (prisma as any).productVariant.findFirst({
              where: {
                productId: item.productId,
                size: sizeStr,
              },
            });

            if (variant) {
              const newStock = Math.max(0, variant.stock - qty);
              await (prisma as any).productVariant.update({
                where: { id: variant.id },
                data: { stock: newStock },
              });
            }
          }
        }
      }
    } catch (err: any) {
      throw new Error(`Không thể trừ tồn kho sản phẩm: ${err?.message || err}`);
    }
  }

  async createOrder(data: {
    userId?: string | null;
    fullName: string;
    phone: string;
    email?: string | null;
    address: string;
    note?: string | null;
    subtotal: number;
    shippingFee?: number;
    grandTotal: number;
    paymentMethod: 'COD' | 'BANK_TRANSFER' | string;
    items: Array<{
      productId?: string | null;
      productName: string;
      productImage?: string | null;
      productSize?: string | null;
      productColor?: string | null;
      price: number;
      quantity: number;
    }>;
  }) {
    const orderCode = this.generateOrderCode();

    // Tự động tìm userId theo email nếu chưa được gửi kèm
    let userId = data.userId || null;
    if (!userId && data.email) {
      try {
        const foundUser = await userRepository.findByEmail(data.email);
        if (foundUser) {
          userId = foundUser.id;
        }
      } catch (err) {
        // Ignore
      }
    }

    // Hạn quét QR 15 phút nếu chọn thanh toán qua Ngân hàng
    const paymentExpiredAt =
      data.paymentMethod === 'BANK_TRANSFER' ? new Date(Date.now() + 15 * 60 * 1000) : null;

    const newOrder = await orderRepository.createOrder({
      code: orderCode,
      userId,
      fullName: data.fullName,
      phone: data.phone,
      email: data.email || null,
      address: data.address,
      note: data.note || null,
      subtotal: data.subtotal,
      shippingFee: data.shippingFee ?? 0,
      grandTotal: data.grandTotal,
      paymentMethod: data.paymentMethod || 'COD',
      paymentStatus: 'UNPAID',
      status: 'PENDING',
      paymentExpiredAt,
      items: data.items.map((item) => ({
        ...item,
        productImage: toRelativePath(item.productImage),
      })),
    });

    // Nếu người dùng đã đăng nhập, tự động dọn dẹp giỏ hàng
    if (userId) {
      try {
        await cartRepository.clearCart(userId);
      } catch (err) {
        // Ignore
      }
    }

    // Nếu chọn thanh toán Chuyển khoản VietQR, bổ sung thông tin Mã QR vào phản hồi
    let qrInfo = null;
    if (data.paymentMethod === 'BANK_TRANSFER') {
      const qrUrl = sepayService.generateVietQRUrl({
        amount: data.grandTotal,
        orderCode,
      });
      qrInfo = {
        qrUrl,
        orderCode,
        amount: data.grandTotal,
        paymentExpiredAt,
      };
    }

    return {
      order: newOrder,
      qrInfo,
    };
  }

  async getOrderById(id: string) {
    let order = await orderRepository.findById(id);
    if (!order) {
      order = await orderRepository.findByCode(id);
    }
    return order;
  }

  async getOrders(params?: { userId?: string; status?: string; search?: string }) {
    return await orderRepository.getOrders(params);
  }

  async updateOrderStatus(id: string, status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED') {
    return await orderRepository.update(id, { status });
  }
}

export default new OrderService();
