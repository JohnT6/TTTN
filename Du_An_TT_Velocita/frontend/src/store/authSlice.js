import { createSlice } from '@reduxjs/toolkit';
import { getCookie, setCookie, removeCookie } from '../helpers/cookie';

const initialUser = getCookie('user_info');
const initialToken = getCookie('access_token');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser,
    token: initialToken,
    isAuthenticated: !!initialToken,
  },
  reducers: {
    loginSuccess: (state, action) => {
      const { user, token } = action.payload || {};
      const userData = user || action.payload;

      state.user = userData;
      state.token = token || state.token;
      state.isAuthenticated = true;

      if (userData) {
        setCookie('user_info', userData, 7);
      }
      if (token) {
        setCookie('access_token', token, 7);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      removeCookie('user_info');
      removeCookie('access_token');
    },
    updateUserInfo: (state, action) => {
      const updatedData = { ...state.user, ...action.payload };
      state.user = updatedData;
      setCookie('user_info', updatedData, 7);
    },
  },
});

export const { loginSuccess, logout, updateUserInfo } = authSlice.actions;
export default authSlice.reducer;
