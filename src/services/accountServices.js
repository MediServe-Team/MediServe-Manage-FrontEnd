import { axiosBase } from '../lib/axios';

export const filterAccountCustomer = async (searchValue) => {
  const response = await axiosBase.get(`/users/filter-customer?searchValue=${searchValue}`);
  return response.data;
};
