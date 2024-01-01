import { axiosBase } from '../lib/axios';

export const setActivity = async (isOpen) => {
  const response = await axiosBase.put('/stores/activity', {
    isOpen,
  });
  return response.data;
};

export const getStoreInforService = async () => {
  const response = await axiosBase.get('/stores/activity');
  return response.data;
};
