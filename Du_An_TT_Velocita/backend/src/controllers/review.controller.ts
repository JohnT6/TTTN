import { Request, Response } from 'express';
import { reviewService } from '../services/review.service';

export const reviewController = {
  create: async (req: Request, res: Response) => {
    try {
      const productId = req.params.id || req.body.productId || '';
      const { userId, userName, rating, comment } = req.body;

      const review = await reviewService.createReview({
        productId,
        userId,
        userName,
        rating: Number(rating),
        comment,
      });

      res.status(201).json({
        success: true,
        message: 'Gửi đánh giá thành công! Cảm ơn nhận xét của bạn.',
        data: review,
      });
    } catch (error) {
      const err = error as Error;
      res.status(400).json({
        success: false,
        message: err.message || 'Không thể tạo đánh giá sản phẩm.',
      });
    }
  },

  getByProduct: async (req: Request, res: Response) => {
    try {
      const productId = req.params.id || '';
      const reviews = await reviewService.getReviewsByProduct(productId);
      res.status(200).json({
        success: true,
        data: reviews,
      });
    } catch (error) {
      const err = error as Error;
      res.status(400).json({
        success: false,
        message: err.message || 'Không thể lấy danh sách đánh giá.',
      });
    }
  },
};
