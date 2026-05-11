import axios from 'axios';
import {
  productListRequest,
  productListSuccess,
  productListFail,
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFail,
} from '../slices/productSlice';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const listProducts = (keyword = '', category = '', sort = '') => async (dispatch) => {
  try {
    dispatch(productListRequest());

    const { data } = await axios.get(
      `${API_URL}/products?keyword=${encodeURIComponent(keyword)}&category=${encodeURIComponent(category)}&sort=${encodeURIComponent(sort)}`
    );

    dispatch(productListSuccess(data.products));
  } catch (error) {
    dispatch(
      productListFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(productDetailsRequest());

    const { data } = await axios.get(`${API_URL}/products/${id}`);

    dispatch(productDetailsSuccess(data));
  } catch (error) {
    dispatch(
      productDetailsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
