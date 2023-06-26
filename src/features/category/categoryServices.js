import { axiosBase } from '../.././lib/axios';

export const getAllCategoryServices = () => {
  return axiosBase.get('/categories/all');
};

export const createCategoryServices = async (data) => {
  const response = await axiosBase.post('/categories/create', {
    categoryName: data?.categoryName,
    isMedicine: data?.isMedicine,
    note: data?.note,
  });
  return response.data;
};
