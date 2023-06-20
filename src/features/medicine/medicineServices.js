import { axiosBase } from '../.././lib/axios';

export const getMedicinesService = async (categoryId, searchValue, pageNumber, limit) => {
  const response = await axiosBase.get(
    `/medicines/by-category/${categoryId}?pageNumber=${pageNumber}&limit=${limit}&searchValue=${searchValue}`,
  );
  return response.data;
};
