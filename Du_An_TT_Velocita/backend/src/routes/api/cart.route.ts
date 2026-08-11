import express from 'express';
import cartController from '../../controllers/cart.controller';

const router = express.Router();

router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.put('/update', cartController.updateQuantity);
router.delete('/item/:id', cartController.removeItem);
router.delete('/clear', cartController.clearCart);

export default router;
