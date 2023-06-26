import axios from 'axios';
import { axiosBase } from '../.././lib/axios';

export const getAllCategoryServices = () => {
  return axiosBase.get('/categories/all');
};

export const createCategoryServices = async (data) => {
  const response = await axiosBase.post('/categories/create', {
    categoryName: data?.categoryName,
    isMedicine: data?.isMedicine,
    note: data?.note,
  });
  return response.data;
};

export const updateCategoryServices = async (data) => {
  const response = await axiosBase.put(`/categories/update/${data?.id}`, {
    categoryName: data?.categoryName,
    isMedicine: data?.isMedicine,
    note: data?.note,
  });
  return response.data;
};

export const deleteCategoryServices = async (id) => {
  const response = await axiosBase.delete(`/categories/delete/${id}`);
  return response.data;
};
