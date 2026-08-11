import axios from './axios.customize';

// ================= ADMIN STATS API =================
export const getAdminStatsAPI = () => {
  const URLBackend = '/api/v1/admin/stats';
  return axios.get(URLBackend);
};

// ================= AUTH API =================
export const loginAPI = (email, password) => {
  const URLBackend = '/api/v1/auth/login';
  return axios.post(URLBackend, { email, password });
};

export const registerAPI = (name, email, password) => {
  const URLBackend = '/api/v1/auth/register';
  return axios.post(URLBackend, { name, email, password });
};

export const fetchAccountApi = () => {
  const URLBackend = '/api/v1/auth/me';
  return axios.get(URLBackend);
};

export const logOutAPI = () => {
  const URLBackend = '/api/v1/auth/logout';
  return axios.post(URLBackend);
};

export const forgotPasswordAPI = (email) => {
  const URLBackend = '/api/v1/auth/forgot-password';
  return axios.post(URLBackend, { email });
};

// ================= BANNER API =================
export const getBannersAPI = () => {
  const URLBackend = '/api/v1/banners';
  return axios.get(URLBackend);
};

export const getBannerByIdAPI = (id) => {
  const URLBackend = `/api/v1/banners/${id}`;
  return axios.get(URLBackend);
};

export const createBannerAPI = (data) => {
  const URLBackend = '/api/v1/banners';
  return axios.post(URLBackend, data);
};

export const updateBannerAPI = (id, data) => {
  const URLBackend = `/api/v1/banners/${id}`;
  return axios.put(URLBackend, data);
};

export const deleteBannerAPI = (id) => {
  const URLBackend = `/api/v1/banners/${id}`;
  return axios.delete(URLBackend);
};

// ================= CATEGORY / BRAND API =================
export const getCategoriesAPI = () => {
  const URLBackend = '/api/v1/categories';
  return axios.get(URLBackend);
};

export const createCategoryAPI = (data) => {
  const URLBackend = '/api/v1/categories';
  return axios.post(URLBackend, data);
};

export const updateCategoryAPI = (id, data) => {
  const URLBackend = `/api/v1/categories/${id}`;
  return axios.put(URLBackend, data);
};

export const deleteCategoryAPI = (id) => {
  const URLBackend = `/api/v1/categories/${id}`;
  return axios.delete(URLBackend);
};

// ================= NEWS API =================
export const getNewsAPI = (query = '') => {
  const URLBackend = `/api/v1/news${query ? `?${query}` : ''}`;
  return axios.get(URLBackend);
};

export const getNewsDetailAPI = (id) => {
  const URLBackend = `/api/v1/news/${id}`;
  return axios.get(URLBackend);
};

export const createNewsAPI = (data) => {
  const URLBackend = '/api/v1/news';
  return axios.post(URLBackend, data);
};

export const updateNewsAPI = (id, data) => {
  const URLBackend = `/api/v1/news/${id}`;
  return axios.put(URLBackend, data);
};

export const deleteNewsAPI = (id) => {
  const URLBackend = `/api/v1/news/${id}`;
  return axios.delete(URLBackend);
};

// ================= USER API =================
export const getUsersAPI = () => {
  const URLBackend = '/api/v1/users';
  return axios.get(URLBackend);
};

export const getUserByIdAPI = (id) => {
  const URLBackend = `/api/v1/users/${id}`;
  return axios.get(URLBackend);
};

export const createUserAPI = (data) => {
  const URLBackend = '/api/v1/users';
  return axios.post(URLBackend, data);
};

export const updateUserAPI = (id, data) => {
  const URLBackend = `/api/v1/users/${id}`;
  return axios.put(URLBackend, data);
};

export const deleteUserAPI = (id) => {
  const URLBackend = `/api/v1/users/${id}`;
  return axios.delete(URLBackend);
};

// ================= SITE SETTINGS API =================
export const getSiteSettingsAPI = () => {
  const URLBackend = '/api/v1/site-settings';
  return axios.get(URLBackend);
};

export const updateSiteSettingsAPI = (data) => {
  const URLBackend = '/api/v1/site-settings';
  return axios.put(URLBackend, data);
};

// ================= ORDER & PAYMENT API =================
export const createOrderAPI = (data) => {
  const URLBackend = '/api/v1/orders';
  return axios.post(URLBackend, data);
};

export const getOrdersAPI = (query = '') => {
  const URLBackend = `/api/v1/orders${query ? `?${query}` : ''}`;
  return axios.get(URLBackend);
};

export const updateOrderStatusAPI = (id, status) => {
  const URLBackend = `/api/v1/orders/${id}/status`;
  return axios.put(URLBackend, { status });
};

export const getOrderDetailAPI = (id) => {
  const URLBackend = `/api/v1/orders/${id}`;
  return axios.get(URLBackend);
};

export const checkOrderStatusAPI = (id) => {
  const URLBackend = `/api/v1/payment/order-status/${id}`;
  return axios.get(URLBackend);
};

// ================= PRODUCT API =================
export const getProductsAPI = (query = '') => {
  const URLBackend = `/api/v1/products${query ? `?${query}` : ''}`;
  return axios.get(URLBackend);
};

export const getProductByIdApi = (id) => {
  const URLBackend = `/api/v1/products/${id}`;
  return axios.get(URLBackend);
};

export const createProductAPI = (data) => {
  const URLBackend = '/api/v1/products';
  return axios.post(URLBackend, data);
};

export const updateProductAPI = (id, data) => {
  const URLBackend = `/api/v1/products/${id}`;
  return axios.put(URLBackend, data);
};

export const deleteProductAPI = (id) => {
  const URLBackend = `/api/v1/products/${id}`;
  return axios.delete(URLBackend);
};

// ================= CART API =================
export const getCartAPI = () => {
  const URLBackend = '/api/v1/cart';
  return axios.get(URLBackend);
};

export const addToCartAPI = (data) => {
  const URLBackend = '/api/v1/cart/add';
  return axios.post(URLBackend, data);
};

export const updateCartQuantityAPI = (itemId, quantity) => {
  const URLBackend = '/api/v1/cart/update';
  return axios.put(URLBackend, { itemId, quantity });
};

export const removeCartItemAPI = (itemId) => {
  const URLBackend = `/api/v1/cart/item/${itemId}`;
  return axios.delete(URLBackend);
};

export const clearCartAPI = () => {
  const URLBackend = '/api/v1/cart/clear';
  return axios.delete(URLBackend);
};

// ================= REVIEW API =================
export const createReviewAPI = (productId, data) => {
  const URLBackend = `/api/v1/products/${productId}/reviews`;
  return axios.post(URLBackend, data);
};

export const getProductReviewsAPI = (productId) => {
  const URLBackend = `/api/v1/products/${productId}/reviews`;
  return axios.get(URLBackend);
};

// ================= FAVORITE / WISHLIST API =================
export const toggleFavoriteAPI = (productId, userId) => {
  const URLBackend = '/api/v1/favorites/toggle';
  return axios.post(URLBackend, { productId, userId });
};

export const getUserFavoritesAPI = (userId) => {
  const URLBackend = `/api/v1/favorites${userId ? `?userId=${userId}` : ''}`;
  return axios.get(URLBackend);
};

export const checkFavoriteStatusAPI = (productId, userId) => {
  const URLBackend = `/api/v1/favorites/check/${productId}${userId ? `?userId=${userId}` : ''}`;
  return axios.get(URLBackend);
};

// ================= USER API =================
export const getUserWithPaginateApi = (query = '') => {
  const URLBackend = `/api/v1/users${query ? `?${query}` : ''}`;
  return axios.get(URLBackend);
};

// ================= FILE UPLOAD API (SINGLE & MULTIPLE) =================
export const uploadFileAPI = (fileImg, folder) => {
  const bodyFormData = new FormData();
  bodyFormData.append('fileImg', fileImg);
  return axios({
    method: 'post',
    url: '/api/v1/file/upload',
    data: bodyFormData,
    headers: {
      'Content-Type': 'multipart/form-data',
      'upload-type': folder,
    },
  });
};

export const uploadMultipleFilesAPI = (files, folder = 'products') => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }
  return axios.post(`/api/v1/file/upload-multiple?folder=${folder}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
