import { axiosBase } from '../lib/axios';

export const filterAccountCustomer = async (searchValue) => {
  const response = await axiosBase.get(`/users/filter-customer?searchValue=${searchValue}`);
  return response.data;
};

export const getAllAccountService = async (axiosWithToken) => {
  const response = await axiosWithToken.get('/users/all');
  return response.data;
};

export const getAccountByIdService = async (axiosWithToken, userId) => {
  const response = await axiosWithToken.get(`/users/${userId}`);
  return response.data;
};

export const updateAccountByIdService = async (axiosWithToken, userId, data) => {
  const response = await axiosWithToken.put(`/users/update-user-info/${userId}`, {
    name: data?.name,
    fullName: data?.fullName,
    address: data?.address,
    age: data?.age,
    dateOfBirth: data?.dateOfBirth,
    phoneNumber: data?.phoneNumber,
  });
  return response.data;
};

export const updateAccountStaffService = async (axiosWithToken, userId, data) => {
  const response = await axiosWithToken.put(`/users/update-user-info/${userId}`, {
    name: data?.name,
    fullName: data?.fullName,
    address: data?.address,
    age: data?.age,
    dateOfBirth: data?.dateOfBirth,
    phoneNumber: data?.phoneNumber,
    numOfPPC: data?.numOfPPC,
    permitList: data?.permitList,
  });
  return response.data;
};

export const deleteAccountService = async (axiosWithToken, userId) => {
  const response = await axiosWithToken.delete(`/users/${userId}`);
  return response.data;
};
