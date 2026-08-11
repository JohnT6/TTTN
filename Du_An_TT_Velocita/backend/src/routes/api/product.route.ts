import express from 'express';
import { productController } from '../../controllers/product.controller';
import { reviewController } from '../../controllers/review.controller';

const router = express.Router();

// Public Product API
router.get('/', productController.index);
router.get('/:id', productController.show);

// Product Review API
router.get('/:id/reviews', reviewController.getByProduct);
router.post('/:id/reviews', reviewController.create);

// Admin Product API
router.post('/', productController.store);
router.put('/:id', productController.update);
router.delete('/:id', productController.destroy);

export default router;
