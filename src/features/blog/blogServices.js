import { axiosBase } from '../.././lib/axios';

export const getAllBlogService = async (pageNumber, limit, status, search) => {
  const response = await axiosBase.get(
    `/blogs/all?status=${status}&search=${search}&pageNumber=${pageNumber}&limit=${limit}`,
  );
  return response.data;
};
