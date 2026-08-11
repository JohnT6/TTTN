/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../libs/prisma';
import { BaseRepository } from './base.repository';

export class OrderRepository extends BaseRepository<any> {
  constructor() {
    super('order' as any);
  }

  async createOrder(data: {
    code: string;
    userId?: string | null;
    fullName: string;
    phone: string;
    email?: string | null;
    address: string;
    note?: string | null;
    subtotal: number;
    shippingFee?: number;
    grandTotal: number;
    paymentMethod: string;
    paymentStatus?: 'UNPAID' | 'PAID' | 'REFUNDED';
    status?: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    paymentExpiredAt?: Date | null;
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
    const { items, userId, ...orderData } = data;

    const createData: any = {
      ...orderData,
      shippingFee: orderData.shippingFee ?? 0,
      orderItems: {
        create: items.map((item) => ({
          productId: item.productId || null,
          productName: item.productName,
          productImage: item.productImage || null,
          productSize: item.productSize || null,
          productColor: item.productColor || null,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    };

    if (userId) {
      createData.user = { connect: { id: userId } };
    }

    return await (this.model as any).create({
      data: createData,
      include: {
        orderItems: true,
      },
    });
  }

  async findByCode(code: string) {
    return await (this.model as any).findFirst({
      where: { code },
      include: {
        orderItems: true,
      },
    });
  }

  async findById(id: string) {
    return await (this.model as any).findUnique({
      where: { id },
      include: {
        orderItems: true,
      },
    });
  }

  async updatePaymentStatus(
    orderId: string,
    data: {
      paymentStatus: 'UNPAID' | 'PAID' | 'REFUNDED';
      transactionNo?: string | null;
      bankCode?: string | null;
      paidAt?: Date | null;
      status?: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    }
  ) {
    return await (this.model as any).update({
      where: { id: orderId },
      data,
      include: {
        orderItems: true,
      },
    });
  }

  async getOrders(params?: { userId?: string; status?: string; search?: string }) {
    const where: any = {};
    if (params?.userId) {
      try {
        const user = await prisma.user.findUnique({
          where: { id: params.userId },
          select: { id: true, email: true, phone: true },
        });

        if (user) {
          const orConditions: any[] = [{ userId: params.userId }];
          if (user.email) orConditions.push({ email: user.email });
          if (user.phone) orConditions.push({ phone: user.phone });

          where.OR = orConditions;
        } else {
          where.userId = params.userId;
        }
      } catch {
        where.userId = params.userId;
      }
    }

    if (params?.status && params.status !== 'all') {
      where.status = params.status;
    }

    if (params?.search) {
      const searchWhere = [
        { code: { contains: params.search } },
        { fullName: { contains: params.search } },
        { phone: { contains: params.search } },
        { email: { contains: params.search } },
      ];
      if (where.OR) {
        where.AND = [
          { OR: where.OR },
          { OR: searchWhere },
        ];
        delete where.OR;
      } else {
        where.OR = searchWhere;
      }
    }

    return await (this.model as any).findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        orderItems: true,
      },
    });
  }
}

export default new OrderRepository();
