import { axiosBase } from '../.././lib/axios';

export const filterItem = async (searchValue, categoryId) => {
  const response = await axiosBase.get(
    `/invoice-into-stocks/product-filter?search=${encodeURIComponent(searchValue)}&categoryId=${categoryId}`,
  );
  return response.data;
};
