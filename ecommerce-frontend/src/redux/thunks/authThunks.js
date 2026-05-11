import axios from 'axios';
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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${API_URL}/auth/login`,
      { email, password },
      config
    );

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

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${API_URL}/auth/register`,
      { name, email, password },
      config
    );

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

export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(profileUpdateRequest());

    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`${API_URL}/users/profile`, user, config);

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
