import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './store/productSlice';
import { fetchCartAsync } from './store/cartSlice';
import ClientLayout from './layouts/ClientLayout';

// Client Pages
import HomePage from './pages/client/HomePage';
import ProductCatalogPage from './pages/client/ProductCatalogPage';
import ProductDetailPage from './pages/client/ProductDetailPage';
import CartPage from './pages/client/CartPage';
import CheckoutPage from './pages/client/CheckoutPage';
import NewsPage from './pages/client/NewsPage';
import NewsDetailPage from './pages/client/NewsDetailPage';
import ProfilePage from './pages/client/ProfilePage';
import OrderHistoryPage from './pages/client/OrderHistoryPage';

// Auth Pages (Standalone without Header/Footer)
import SignInPage from './pages/client/SignInPage';
import SignUpPage from './pages/client/SignUpPage';
import ResetPasswordPage from './pages/client/ResetPasswordPage';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ProductManager from './pages/admin/ProductManager';
import ProductFormPage from './pages/admin/ProductFormPage';
import CategoryManager from './pages/admin/CategoryManager';
import BannerManager from './pages/admin/BannerManager';
import BannerFormPage from './pages/admin/BannerFormPage';
import NewsManager from './pages/admin/NewsManager';
import NewsFormPage from './pages/admin/NewsFormPage';
import UserManager from './pages/admin/UserManager';
import SiteSettingsManager from './pages/admin/SiteSettingsManager';
import OrderManager from './pages/admin/OrderManager';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Tự động nạp sản phẩm và giỏ hàng từ Backend API
    dispatch(fetchProducts());
    dispatch(fetchCartAsync());
  }, [dispatch]);

  return (
    <Routes>
      {/* Client Routes với Header & Footer từ ClientLayout */}
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<ProductCatalogPage />} />
        <Route path="product-catalog" element={<ProductCatalogPage />} />
        <Route path="product-detail" element={<ProductDetailPage />} />
        <Route path="product-detail/:id" element={<ProductDetailPage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="news/:id" element={<NewsDetailPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="order-history" element={<OrderHistoryPage />} />
      </Route>

      {/* Standalone Auth Routes (Không Header / Footer) */}
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="site-settings" element={<SiteSettingsManager />} />
        <Route path="products" element={<ProductManager />} />
        <Route path="products/create" element={<ProductFormPage />} />
        <Route path="products/edit/:id" element={<ProductFormPage />} />
        <Route path="categories" element={<CategoryManager />} />
        <Route path="banners" element={<BannerManager />} />
        <Route path="banners/create" element={<BannerFormPage />} />
        <Route path="banners/edit/:id" element={<BannerFormPage />} />
        <Route path="news" element={<NewsManager />} />
        <Route path="news/create" element={<NewsFormPage />} />
        <Route path="news/edit/:id" element={<NewsFormPage />} />
        <Route path="users" element={<UserManager />} />
        <Route path="orders" element={<OrderManager />} />
      </Route>
    </Routes>
  );
}
