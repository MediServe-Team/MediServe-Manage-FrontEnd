import { axiosBase } from '../lib/axios';

export const getAllUnitsService = async () => {
  const response = await axiosBase.get('/units/all');
  return response.data;
};
