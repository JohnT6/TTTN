import express from 'express';
import authRoutes from './api/auth.route';
import productRoutes from './api/product.route';
import favoriteRoutes from './api/favorite.route';
import bannerRoutes from './api/banner.route';
import categoryRoutes from './api/category.route';
import newsRoutes from './api/news.route';
import cartRoutes from './api/cart.route';
import adminRoutes from './api/admin.route';
import fileRoutes from './api/file.route';
import userRoutes from './api/user.route';
import siteSettingRoutes from './api/site_setting.route';
import orderRoutes from './api/order.route';
import paymentRoutes from './api/payment.route';

const router = express.Router();

// Route Auth, Products, Favorites, Banners, Categories, News, Cart, Admin, Users, Site Settings, Orders & Payments
router.use('/v1/auth', authRoutes);
router.use('/v1/products', productRoutes);
router.use('/v1/favorites', favoriteRoutes);
router.use('/v1/banners', bannerRoutes);
router.use('/v1/categories', categoryRoutes);
router.use('/v1/news', newsRoutes);
router.use('/v1/cart', cartRoutes);
router.use('/v1/admin', adminRoutes);
router.use('/v1/file', fileRoutes);
router.use('/v1/users', userRoutes);
router.use('/v1/site-settings', siteSettingRoutes);
router.use('/v1/orders', orderRoutes);
router.use('/v1/payment', paymentRoutes);
router.use('/v1/payments', paymentRoutes);

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/banners', bannerRoutes);
router.use('/categories', categoryRoutes);
router.use('/news', newsRoutes);
router.use('/cart', cartRoutes);
router.use('/admin', adminRoutes);
router.use('/file', fileRoutes);
router.use('/users', userRoutes);
router.use('/site-settings', siteSettingRoutes);
router.use('/orders', orderRoutes);
router.use('/payment', paymentRoutes);
router.use('/payments', paymentRoutes);

export default router;