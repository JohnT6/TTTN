import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProductsAPI } from '../services/api';
import { formatProductData } from '../helpers/helper';

// Async thunk lấy sản phẩm thực từ Backend API qua getProductsAPI
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      // Build queryString từ params
      const queryParts = [];
      if (params.is_new !== undefined) queryParts.push(`isNew=${params.is_new}`);
      if (params.is_sale !== undefined) queryParts.push(`isSale=${params.is_sale}`);
      if (params.is_best !== undefined) queryParts.push(`isBest=${params.is_best}`);
      if (params.category) queryParts.push(`categoryId=${params.category}`);
      if (params.gender) queryParts.push(`gender=${params.gender}`);
      if (params.search || params.q) queryParts.push(`q=${params.search || params.q}`);
      if (params.page) queryParts.push(`page=${params.page}`);
      if (params.limit) queryParts.push(`limit=${params.limit}`);

      const queryString = queryParts.join('&');
      const res = await getProductsAPI(queryString);

      if (res && res.success && Array.isArray(res.data)) {
        return res.data.map(formatProductData);
      }
      return [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    categories: [],
    loading: false,
    error: null,
    searchTerm: '',
    selectedCategory: 'all',
    selectedCategories: [],
    selectedGenders: [],
    selectedFeatures: [],
    minPrice: 0,
    maxPrice: 10000000,
    selectedSize: 'all',
    sortBy: 'default',
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload.map(formatProductData);
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload || [];
    },
    setSelectedGenders: (state, action) => {
      state.selectedGenders = action.payload || [];
    },
    setSelectedFeatures: (state, action) => {
      state.selectedFeatures = action.payload || [];
    },
    setPriceRange: (state, action) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },
    setSelectedSize: (state, action) => {
      state.selectedSize = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.searchTerm = '';
      state.selectedCategory = 'all';
      state.selectedCategories = [];
      state.selectedGenders = [];
      state.selectedFeatures = [];
      state.minPrice = 0;
      state.maxPrice = 10000000;
      state.selectedSize = 'all';
      state.sortBy = 'default';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setProducts,
  setCategories,
  setSearchTerm,
  setSelectedCategory,
  setSelectedCategories,
  setSelectedGenders,
  setSelectedFeatures,
  setPriceRange,
  setSelectedSize,
  setSortBy,
  resetFilters,
} = productSlice.actions;

export default productSlice.reducer;
