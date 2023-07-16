import { axiosPrivate } from '../../lib/axios';

export const loginService = (email, password) => {
  return axiosPrivate.post('/auth/login', { email, password });
};

export const refreshToken = async (token) => {
  return axiosPrivate.post('/auth/refreshToken');
};

export const logoutService = async (axiosWithToken) => {
  return axiosWithToken.delete('/auth/logout');
};
