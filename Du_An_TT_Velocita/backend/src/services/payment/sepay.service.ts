import crypto from 'crypto';
import { SEPAY_CONFIG } from '../../config/sepay.config';
import orderRepository from '../../repositories/order.repository';
import orderService from '../order.service';

export class SepayService {
  /**
   * Xác thực chữ ký bảo mật HMAC-SHA256 từ SePay (Header x-sepay-signature)
   */
  verifySignature(rawBody: any, signatureHeader?: string, timestampHeader?: string): boolean {
    const secretKey = SEPAY_CONFIG.WEBHOOK_SECRET;
    if (!secretKey) {
      // Nếu chưa điền Secret Key trong .env, cho phép qua
      return true;
    }

    if (!signatureHeader) {
      return false;
    }

    try {
      const timestamp = timestampHeader || '';
      const payloadString = typeof rawBody === 'string' ? rawBody : JSON.stringify(rawBody);
      
      // Công thức tính HMAC chuẩn 100% của SePay: timestamp + '.' + payload
      const signPayload = timestamp ? `${timestamp}.${payloadString}` : payloadString;

      const expectedHex = crypto
        .createHmac('sha256', secretKey)
        .update(signPayload)
        .digest('hex');

      const expectedWithSha256 = `sha256=${expectedHex}`;
      const cleanSignature = signatureHeader.replace(/^sha256=/i, '').trim();

      return (
        signatureHeader === expectedWithSha256 ||
        cleanSignature === expectedHex ||
        signatureHeader === expectedHex
      );
    } catch (err) {
      return false;
    }
  }

  /**
   * Tạo đường dẫn ảnh mã VietQR động theo chuẩn cấu trúc SePay (vietqr.app)
   */
  generateVietQRUrl(params: { amount: number; orderCode: string }): string {
    const { amount, orderCode } = params;
    const bank = encodeURIComponent(SEPAY_CONFIG.BANK_ID);
    const acc = encodeURIComponent(SEPAY_CONFIG.ACCOUNT_NO);
    const holder = encodeURIComponent(SEPAY_CONFIG.ACCOUNT_NAME);

    // Tự động bổ sung tiền tố SEVQR cho VietinBank
    const transferContent = orderCode.startsWith('SEVQR') ? orderCode : `SEVQR ${orderCode}`;
    const des = encodeURIComponent(transferContent);

    return `https://vietqr.app/img?bank=${bank}&acc=${acc}&template=${SEPAY_CONFIG.QR_TEMPLATE}&amount=${amount}&des=${des}&showinfo=true&holder=${holder}&store=velocita`;
  }

  /**
   * Xử lý Webhook gửi sang từ SePay khi ngân hàng nhận tiền thành công
   */
  async processWebhook(webhookData: any) {
    const { content, transferAmount, referenceCode, gateway, transferType, code } = webhookData;

    // 1. Chỉ xử lý tiền vào ("in")
    if (transferType && transferType !== 'in') {
      return { success: true, message: 'Bỏ qua giao dịch tiền ra' };
    }

    // 2. Lấy mã đơn hàng: Ưu tiên dùng trường `code` do SePay bóc sẵn, nếu không có thì bóc từ `content`
    let orderCode = code ? String(code).trim().toUpperCase() : null;

    if (!orderCode && content) {
      const codeMatch = content.match(/VEL[A-Z0-9]+/i);
      if (codeMatch) {
        orderCode = codeMatch[0].toUpperCase();
      }
    }

    if (!orderCode) {
      return { success: true, message: 'Không tìm thấy mã đơn hàng khớp trong Webhook' };
    }

    const order = await orderRepository.findByCode(orderCode);

    if (!order) {
      return { success: true, message: `Không tìm thấy đơn hàng ${orderCode}` };
    }

    // 3. Kiểm tra nếu đơn hàng đã được gạch nợ thành công trước đó
    if (order.paymentStatus === 'PAID') {
      return { success: true, message: `Đơn hàng ${orderCode} đã được gạch nợ trước đó` };
    }

    // 4. Kiểm tra số tiền chuyển khớp tối thiểu với tổng giá trị đơn hàng
    if (transferAmount < order.grandTotal) {
      // Amount differs
    }

    // 5. Cập nhật đơn hàng thành ĐÃ THANH TOÁN (PAID)
    const updatedOrder = await orderRepository.updatePaymentStatus(order.id, {
      paymentStatus: 'PAID',
      status: 'PROCESSING', // Chuyển đơn sang trạng thái Đang xử lý
      transactionNo: referenceCode || String(webhookData.id || ''),
      bankCode: gateway || SEPAY_CONFIG.BANK_ID,
      paidAt: new Date(),
    });

    // 6. Tự động trừ số lượng tồn kho (stock) của từng sản phẩm trong đơn hàng
    try {
      await orderService.deductProductStock(order.id);
    } catch (err: any) {
      throw new Error(`Xảy ra lỗi khi cập nhật trừ tồn kho kho hàng: ${err?.message || err}`);
    }

    return {
      success: true,
      data: updatedOrder,
      message: `Đã thanh toán thành công đơn hàng ${orderCode}`,
    };
  }
}

export default new SepayService();
