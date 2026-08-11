import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCartAPI,
  addToCartAPI,
  updateCartQuantityAPI,
  removeCartItemAPI,
  clearCartAPI,
} from '../services/api';

const loadLocalCart = () => {
  try {
    return JSON.parse(localStorage.getItem('cart_items') || '[]');
  } catch (e) {
    return [];
  }
};

const saveLocalCart = (items) => {
  try {
    localStorage.setItem('cart_items', JSON.stringify(items));
  } catch (e) {}
};

// Async Thunks gọi Backend API thực tế
export const fetchCartAsync = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const res = await getCartAPI();
    return res.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const addToCartAsync = createAsyncThunk('cart/addToCart', async (payload, { rejectWithValue }) => {
  try {
    const res = await addToCartAPI(payload);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const updateQuantityAsync = createAsyncThunk('cart/updateQuantity', async ({ itemId, quantity }, { rejectWithValue }) => {
  try {
    const res = await updateCartQuantityAPI(itemId, quantity);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const removeFromCartAsync = createAsyncThunk('cart/removeFromCart', async (itemId, { rejectWithValue }) => {
  try {
    const res = await removeCartItemAPI(itemId);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const clearCartAsync = createAsyncThunk('cart/clearCart', async (_, { rejectWithValue }) => {
  try {
    const res = await clearCartAPI();
    return res.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadLocalCart(),
    cartId: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Reducers local cho phản hồi giao diện tức thì (Instant Feedback)
    addToCart: (state, action) => {
      const { product, size, color, variantId, quantity = 1 } = action.payload;
      const existingIndex = state.items.findIndex(
        (item) =>
          item.product?.id === product?.id &&
          (item.size === size || (!item.size && !size)) &&
          (item.color === color || (!item.color && !color))
      );

      if (existingIndex > -1) {
        state.items[existingIndex].quantity += quantity;
      } else {
        state.items.push({
          id: 'temp_' + Date.now(),
          product,
          size,
          color,
          variantId,
          quantity,
        });
      }
      saveLocalCart(state.items);
    },
    removeFromCart: (state, action) => {
      const { itemId, productId, size } = action.payload || {};
      state.items = state.items.filter((item) => {
        if (itemId && item.id === itemId) return false;
        if (productId && item.product?.id === productId && item.size === size) return false;
        return true;
      });
      saveLocalCart(state.items);
    },
    updateQuantity: (state, action) => {
      const { itemId, productId, size, quantity } = action.payload;
      const item = state.items.find(
        (item) => (itemId && item.id === itemId) || (item.product?.id === productId && item.size === size)
      );
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
      saveLocalCart(state.items);
    },
    updateSize: (state, action) => {
      const { itemId, productId, oldSize, newSize } = action.payload;
      const item = state.items.find(
        (item) => (itemId && item.id === itemId) || (item.product?.id === productId && item.size === oldSize)
      );
      if (item) {
        item.size = newSize;
      }
      saveLocalCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart_items');
    },
  },
  extraReducers: (builder) => {
    const handleCartResponse = (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.cartId = action.payload.id;
        state.items = action.payload.items || [];
        saveLocalCart(state.items);
      }
    };

    builder
      .addCase(fetchCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartAsync.fulfilled, handleCartResponse)
      .addCase(fetchCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCartAsync.fulfilled, handleCartResponse)
      .addCase(updateQuantityAsync.fulfilled, handleCartResponse)
      .addCase(removeFromCartAsync.fulfilled, handleCartResponse)
      .addCase(clearCartAsync.fulfilled, handleCartResponse);
  },
});

export const { addToCart, removeFromCart, updateQuantity, updateSize, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
