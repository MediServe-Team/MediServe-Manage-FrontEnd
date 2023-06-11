import { axiosBase } from '../.././lib/axios';

export const getAllCategoryServices = () => {
  return axiosBase.get('/categories/all');
};
