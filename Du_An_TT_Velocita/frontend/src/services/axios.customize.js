import axios from 'axios';
import { getCookie, setCookie } from '../helpers/cookie';

export const BASE_URL = 'http://localhost:3000';

// Đảm bảo tạo và giữ sessionKey cho khách vãng lai trong Cookie
export const getOrCreateSessionKey = () => {
  let sessionKey = getCookie('velocita_session_key');
  if (!sessionKey) {
    sessionKey = 'sess_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    setCookie('velocita_session_key', sessionKey, 30);
  }
  return sessionKey;
};

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor cho Request: Gắn Bearer Token JWT từ Cookie & Session Key khi gửi lên Backend
instance.interceptors.request.use(
  (config) => {
    const token = getCookie('access_token') || getCookie('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['x-session-key'] = getOrCreateSessionKey();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho Response: Trả về res.data từ Backend API
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Có lỗi xảy ra khi kết nối máy chủ.';
    return Promise.reject(new Error(message));
  }
);

export default instance;
