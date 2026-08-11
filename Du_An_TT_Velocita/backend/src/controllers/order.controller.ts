import { Request, Response } from 'express';
import orderService from '../services/order.service';

export class OrderController {
  async createOrder(req: Request, res: Response) {
    try {
      const data = req.body;
      if (!data.fullName || !data.phone || !data.address || !data.items || data.items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Vui lòng cung cấp đầy đủ thông tin giao hàng và danh sách sản phẩm.',
        });
      }

      // Đọc user id từ Auth Middleware nếu có
      const userId = (req as any).user?.id || data.userId || null;

      const result = await orderService.createOrder({
        ...data,
        userId,
      });

      return res.status(201).json({
        success: true,
        data: result,
        message: 'Tạo đơn hàng thành công!',
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi khởi tạo đơn hàng',
      });
    }
  }

  async getOrderDetail(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const order = await orderService.getOrderById(id);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy đơn hàng này.',
        });
      }

      return res.json({
        success: true,
        data: order,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi lấy chi tiết đơn hàng',
      });
    }
  }

  async getOrders(req: Request, res: Response) {
    try {
      const { status, search, userId } = req.query;
      const orders = await orderService.getOrders({
        userId: userId as string,
        status: status as string,
        search: search as string,
      });

      return res.json({
        success: true,
        data: orders,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi lấy danh sách đơn hàng',
      });
    }
  }

  async updateOrderStatus(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const { status } = req.body;

      const updated = await orderService.updateOrderStatus(id, status);
      return res.json({
        success: true,
        data: updated,
        message: 'Cập nhật trạng thái đơn hàng thành công.',
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi cập nhật trạng thái đơn hàng',
      });
    }
  }
}

export default new OrderController();
