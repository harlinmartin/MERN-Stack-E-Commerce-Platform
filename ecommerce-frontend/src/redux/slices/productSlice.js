import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  product: {},
  recommendations: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productListRequest: (state) => {
      state.loading = true;
      state.products = [];
    },
    productListSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    productListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    productDetailsRequest: (state) => {
      state.loading = true;
    },
    productDetailsSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    productDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    recommendationRequest: (state) => {
      state.loading = true;
    },
    recommendationSuccess: (state, action) => {
      state.loading = false;
      state.recommendations = action.payload;
    },
    recommendationFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  productListRequest,
  productListSuccess,
  productListFail,
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFail,
  recommendationRequest,
  recommendationSuccess,
  recommendationFail,
} = productSlice.actions;

export default productSlice.reducer;
