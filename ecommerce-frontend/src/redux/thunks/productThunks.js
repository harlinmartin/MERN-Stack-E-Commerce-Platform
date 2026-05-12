import axiosInstance from '../../api/axiosInstance';
import {
  productListRequest,
  productListSuccess,
  productListFail,
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFail,
  recommendationRequest,
  recommendationSuccess,
  recommendationFail,
} from '../slices/productSlice';

export const listProducts = (keyword = '', category = '', sort = '') => async (dispatch) => {
  try {
    dispatch(productListRequest());

    const { data } = await axiosInstance.get(
      `/products?keyword=${encodeURIComponent(keyword)}&category=${encodeURIComponent(category)}&sort=${encodeURIComponent(sort)}`
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

    const { data } = await axiosInstance.get(`/products/${id}`);

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

export const listRecommendations = () => async (dispatch) => {
  try {
    dispatch(recommendationRequest());

    const { data } = await axiosInstance.get('/analytics/recommendations/my-recommendations');

    dispatch(recommendationSuccess(data.recommendations));
  } catch (error) {
    dispatch(
      recommendationFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
