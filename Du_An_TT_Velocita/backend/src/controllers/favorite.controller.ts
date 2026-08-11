/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { favoriteService } from '../services/favorite.service';

export const favoriteController = {
  toggle: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.id || req.body.userId;
      const productId = req.body.productId || req.params.id;

      const result = await favoriteService.toggleFavorite(userId, productId);

      res.status(200).json({
        success: true,
        message: result.message,
        data: { isFavorite: result.isFavorite },
      });
    } catch (error) {
      const err = error as Error;
      res.status(400).json({
        success: false,
        message: err.message || 'Không thể cập nhật trạng thái yêu thích.',
      });
    }
  },

  getUserFavorites: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.id || req.query.userId as string;
      const favorites = await favoriteService.getUserFavorites(userId);

      res.status(200).json({
        success: true,
        data: favorites,
      });
    } catch (error) {
      const err = error as Error;
      res.status(400).json({
        success: false,
        message: err.message || 'Không thể lấy danh sách yêu thích.',
      });
    }
  },

  checkFavoriteStatus: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.id || req.query.userId as string;
      const productId = req.params.productId || req.query.productId as string;

      const isFavorite = await favoriteService.checkIsFavorite(userId, productId);

      res.status(200).json({
        success: true,
        data: { isFavorite },
      });
    } catch (error) {
      res.status(200).json({
        success: true,
        data: { isFavorite: false },
      });
    }
  },
};
