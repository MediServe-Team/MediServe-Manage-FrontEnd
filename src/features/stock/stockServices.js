import { axiosBase } from '../.././lib/axios';

export const filterItemService = async (searchValue, categoryId) => {
  const response = await axiosBase.get(
    `/invoice-into-stocks/product-filter?search=${encodeURIComponent(searchValue)}&categoryId=${categoryId}`,
  );
  return response.data;
};

export const createInvoiceService = async (data) => {
  const response = await axiosBase.post('/invoice-into-stocks/create', data);
  return response.data;
};
