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

export const filterHistoryInvoiceService = async (fromDate, toDate, sort, pageNumber, limit) => {
  const response = await axiosBase.get(
    `/invoice-into-stocks/filter-history?fromDate=${fromDate}&toDate=${toDate}&sort=${sort}&pageNumber=${pageNumber}&limit=${limit}`,
  );
  return response.data;
};

export const getDetailInvoiceServices = async (invoiceId) => {
  const response = await axiosBase.get(`/invoice-into-stocks/${invoiceId}`);
  return response.data;
};
