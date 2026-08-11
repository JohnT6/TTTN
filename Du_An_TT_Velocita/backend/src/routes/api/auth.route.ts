import express from 'express';
import { authController } from '../../controllers/auth.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validateBody } from '../../middlewares/validate.middleware';
import { registerSchema, loginSchema, forgotPasswordSchema } from '../../validators/auth.validator';

const router = express.Router();

router.post('/register', validateBody(registerSchema), authController.register);
router.post('/login', validateBody(loginSchema), authController.login);
router.get('/me', authMiddleware, authController.profile);
router.post('/logout', authMiddleware, authController.logout);
router.post('/forgot-password', validateBody(forgotPasswordSchema), authController.forgotPassword);

export default router;
