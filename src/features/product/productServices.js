import { axiosBase } from '../../lib/axios';

export const getProductsService = async (categoryId, searchValue, pageNumber, limit) => {
  const response = await axiosBase.get(
    `/products/by-category/${categoryId}?pageNumber=${pageNumber}&limit=${limit}&searchValue=${searchValue}`,
  );
  return response.data;
};
