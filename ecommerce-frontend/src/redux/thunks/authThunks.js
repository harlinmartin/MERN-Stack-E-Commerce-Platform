import axiosInstance from '../../api/axiosInstance';
import {
  loginRequest,
  loginSuccess,
  loginFail,
  registerRequest,
  registerSuccess,
  registerFail,
  profileUpdateRequest,
  profileUpdateSuccess,
  profileUpdateFail,
} from '../slices/authSlice';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const { data } = await axiosInstance.post('/auth/login', { email, password });

    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(
      loginFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch(registerRequest());

    const { data } = await axiosInstance.post('/auth/register', { name, email, password });

    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(
      registerFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const updateProfile = (user) => async (dispatch) => {
  try {
    dispatch(profileUpdateRequest());

    // axiosInstance automatically adds the token via interceptor
    const { data } = await axiosInstance.put('/users/profile', user);

    dispatch(profileUpdateSuccess(data));
  } catch (error) {
    dispatch(
      profileUpdateFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
