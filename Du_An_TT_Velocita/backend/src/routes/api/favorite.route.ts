import express from 'express';
import { favoriteController } from '../../controllers/favorite.controller';

const router = express.Router();

// Toggle yêu thích (Thích / Bỏ thích)
router.post('/toggle', favoriteController.toggle);

// Lấy danh sách sản phẩm yêu thích của người dùng
router.get('/', favoriteController.getUserFavorites);

// Kiểm tra 1 sản phẩm xem đã được yêu thích chưa
router.get('/check/:productId', favoriteController.checkFavoriteStatus);

export default router;
