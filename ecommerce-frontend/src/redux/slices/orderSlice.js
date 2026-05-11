import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  order: {},
  orders: [],
  loading: false,
  success: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderCreateRequest: (state) => {
      state.loading = true;
    },
    orderCreateSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.order = action.payload;
    },
    orderCreateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    orderCreateReset: (state) => {
      state.success = false;
      state.order = {};
    },
    orderListMyRequest: (state) => {
      state.loading = true;
    },
    orderListMySuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    orderListMyFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  orderCreateRequest,
  orderCreateSuccess,
  orderCreateFail,
  orderCreateReset,
  orderListMyRequest,
  orderListMySuccess,
  orderListMyFail,
} = orderSlice.actions;

export default orderSlice.reducer;
