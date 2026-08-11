import { Router } from 'express';
import orderController from '../../controllers/order.controller';

const router = Router();

router.post('/', (req, res) => orderController.createOrder(req, res));
router.get('/', (req, res) => orderController.getOrders(req, res));
router.get('/:id', (req, res) => orderController.getOrderDetail(req, res));
router.put('/:id/status', (req, res) => orderController.updateOrderStatus(req, res));

export default router;
