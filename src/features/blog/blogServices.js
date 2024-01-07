import { axiosBase, axiosPrivate } from '../.././lib/axios';

export const getAllBlogService = async (pageNumber, limit, status, search) => {
  const response = await axiosBase.get(
    `/blogs/all?status=${status}&search=${search}&pageNumber=${pageNumber}&limit=${limit}`,
  );
  return response.data;
};

export const createBlogService = async (axiosPrivate, data) => {
  const response = await axiosPrivate.post('/blogs/create', data);
  return response.data;
};
