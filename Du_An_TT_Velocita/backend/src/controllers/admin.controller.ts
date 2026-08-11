import { Request, Response, NextFunction } from 'express';
import { adminServices } from '../services/admin.services';

export const adminController = {
  getStats: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await adminServices.getStats();
      res.status(200).json({
        success: true,
        message: 'Lấy dữ liệu thống kê thành công',
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  },
};
