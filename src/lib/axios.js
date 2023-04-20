import axios from 'axios';
const BASE_URL = process.env.BASE_URL || 'http://localhost:5000/api';

const axiosBase = axios.create({
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
