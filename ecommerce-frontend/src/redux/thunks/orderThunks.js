import axiosInstance from '../../api/axiosInstance';
import {
  orderCreateRequest,
  orderCreateSuccess,
  orderCreateFail,
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,
  orderListMyRequest,
  orderListMySuccess,
  orderListMyFail,
} from '../slices/orderSlice';

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(orderCreateRequest());

    const { data } = await axiosInstance.post('/orders', order);

    dispatch(orderCreateSuccess(data));
  } catch (error) {
    dispatch(
      orderCreateFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch(orderDetailsRequest());

    const { data } = await axiosInstance.get(`/orders/${id}`);

    dispatch(orderDetailsSuccess(data));
  } catch (error) {
    dispatch(
      orderDetailsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const listMyOrders = () => async (dispatch) => {
  try {
    dispatch(orderListMyRequest());

    const { data } = await axiosInstance.get('/orders/myorders');

    dispatch(orderListMySuccess(data));
  } catch (error) {
    dispatch(
      orderListMyFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
