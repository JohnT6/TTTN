import express from 'express';
import { bannerController } from '../../controllers/banner.controller';

const router = express.Router();

router.get('/', bannerController.index);
router.get('/:id', bannerController.show);
router.post('/', bannerController.create);
router.put('/:id', bannerController.update);
router.delete('/:id', bannerController.destroy);

export default router;
