import axios from 'axios';
const BASE_URL = process.env.BASE_URL || 'https://mediserveserver-production.up.railway.app/api';

export const axiosBase = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 3000,
});

export const axiosImage = axios.create({
  // baseUrl: reference to url cloud store image
});

export default axiosBase;
