/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const sendOtp = async (email, name) => {
  try {
    await axios({
      method: 'POST',
      url: '/api/v1/users/send-otp',
      data: {
        email,
        name,
      },
    });
    showAlert('success', 'OTP sent to your email!');
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const login = async (email, password, returnTo = '/') => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
        returnTo,
      },
    });
    // console.log(res);

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign(res.data.redirectTo || '/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const signup = async (
  name,
  email,
  otp,
  password,
  passwordConfirm,
  returnTo = '/',
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        otp,
        password,
        passwordConfirm,
        returnTo,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Signed up successfully!');
      window.setTimeout(() => {
        location.assign(res.data.redirectTo || '/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/logout',
    });
    if (res.data.status == 'success') location.assign('/');
  } catch (err) {
    showAlert('error', 'Error logging out! Try again');
  }
};

export const forgotPassword = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/forgotPassword',
      data: {
        email,
      },
    });

    if (res.data.status === 'success') {
      showAlert(
        'success',
        'Password reset link sent. Please check your inbox.',
      );
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
