/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const createReview = async (tour, rating, review) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/tours/${tour}/reviews`,
      data: {
        tour,
        rating,
        review,
      },
    });

    if (res.data.status === 'success') {
      return true;
    }
    return false;
  } catch (err) {
    const message =
      err?.response?.data?.message ||
      'Unable to submit your review right now. Please try again.';
    showAlert('error', message);
    return false;
  }
};
