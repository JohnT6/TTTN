import { Request, Response } from 'express';
import sepayService from '../services/payment/sepay.service';
import orderRepository from '../repositories/order.repository';

export class PaymentController {
  /**
   * Đón Webhook tự động gửi sang từ SePay
   * POST /api/v1/payment/sepay-webhook
   */
  async handleSepayWebhook(req: Request, res: Response) {
    try {
      const signatureHeader = (req.headers['x-sepay-signature'] || req.headers['X-SePay-Signature']) as string;
      const timestampHeader = (req.headers['x-sepay-timestamp'] || req.headers['X-SePay-Timestamp']) as string;
      
      const isValid = sepayService.verifySignature(req.body, signatureHeader, timestampHeader);

      if (!isValid) {
        return res.status(401).json({
          success: false,
          message: 'Chữ ký bảo mật HMAC-SHA256 không hợp lệ!',
        });
      }

      const result = await sepayService.processWebhook(req.body);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi xử lý SePay Webhook',
      });
    }
  }

  /**
   * Kiểm tra trạng thái đơn hàng (Dành cho Frontend Polling)
   * GET /api/v1/payment/order-status/:id
   */
  async checkOrderStatus(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      if (!id) {
        return res.status(400).json({ success: false, message: 'Thiếu ID đơn hàng' });
      }

      // Thử tìm theo ID hoặc theo Code
      let order = await orderRepository.findById(id);
      if (!order) {
        order = await orderRepository.findByCode(id);
      }

      if (!order) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
      }

      return res.json({
        success: true,
        data: {
          id: order.id,
          code: order.code,
          paymentStatus: order.paymentStatus,
          status: order.status,
          grandTotal: order.grandTotal,
          paidAt: order.paidAt,
          isPaid: order.paymentStatus === 'PAID',
        },
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi kiểm tra trạng thái đơn hàng',
      });
    }
  }
}

export default new PaymentController();
