import { Router } from 'express';
import paymentController from '../../controllers/payment.controller';

const router = Router();

// Endpoint Đón Webhook tự động từ SePay (POST)
router.post('/sepay-webhook', (req, res) => paymentController.handleSepayWebhook(req, res));

// Endpoint Kiểm tra trạng thái gạch nợ thanh toán (GET) cho Frontend Polling
router.get('/order-status/:id', (req, res) => paymentController.checkOrderStatus(req, res));

export default router;
