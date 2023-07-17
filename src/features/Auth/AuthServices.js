import { axiosPrivate } from '../../lib/axios';

export const loginService = (email, password) => {
  return axiosPrivate.post('/auth/login', { email, password });
};

export const refreshToken = async () => {
  const response = await axiosPrivate.post('/auth/refreshToken');
  return response.data;
};

export const logoutService = async (axiosWithToken) => {
  return axiosWithToken.delete('/auth/logout');
};
