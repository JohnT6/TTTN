import { Request, Response } from 'express';
import cartService from '../services/cart.service';

export class CartController {
  async getCart(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      const sessionKey = (req.headers['x-session-key'] as string) || (req.query.sessionKey as string);

      const cart = await cartService.getCart(userId, sessionKey);
      return res.json({
        success: true,
        data: cart,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi lấy thông tin giỏ hàng',
      });
    }
  }

  async addToCart(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      const sessionKey = (req.headers['x-session-key'] as string) || req.body.sessionKey;
      const { productId, variantId, size, color, quantity } = req.body;

      if (!productId) {
        return res.status(400).json({
          success: false,
          message: 'productId là bắt buộc',
        });
      }

      const cart = await cartService.addToCart({
        userId,
        sessionKey,
        productId,
        variantId,
        size,
        color,
        quantity: Number(quantity) || 1,
      });

      return res.json({
        success: true,
        message: 'Đã thêm vào giỏ hàng thành công',
        data: cart,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi thêm sản phẩm vào giỏ hàng',
      });
    }
  }

  async updateQuantity(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      const sessionKey = (req.headers['x-session-key'] as string) || req.body.sessionKey;
      const { itemId, quantity } = req.body;

      if (!itemId) {
        return res.status(400).json({
          success: false,
          message: 'itemId là bắt buộc',
        });
      }

      const cart = await cartService.updateQuantity(itemId, Number(quantity), userId, sessionKey);
      return res.json({
        success: true,
        message: 'Cập nhật số lượng thành công',
        data: cart,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi cập nhật giỏ hàng',
      });
    }
  }

  async removeItem(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      const sessionKey = (req.headers['x-session-key'] as string) || (req.query.sessionKey as string);
      const itemId = req.params.id as string;

      const cart = await cartService.removeItem(itemId, userId, sessionKey);
      return res.json({
        success: true,
        message: 'Đã xóa sản phẩm khỏi giỏ hàng',
        data: cart,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi xóa sản phẩm khỏi giỏ hàng',
      });
    }
  }

  async clearCart(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      const sessionKey = (req.headers['x-session-key'] as string) || (req.query.sessionKey as string);

      const cart = await cartService.clearCart(userId, sessionKey);
      return res.json({
        success: true,
        message: 'Đã làm sạch giỏ hàng',
        data: cart,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi xóa sạch giỏ hàng',
      });
    }
  }
}

export default new CartController();
