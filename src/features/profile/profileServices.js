import { axiosBase } from '../../lib/axios';

export const getProfileServices = () => {
  return axiosBase.get('/me/profile');
};

export const updateProfileServices = async (data) => {
  const response = await axiosBase.put('/me/update-info', {
    name: data?.name,
    fullName: data?.fullName,
    gender: data?.gender,
    age: data?.age,
    dateOfBirth: data?.dateOfBirth,
    phoneNumber: data?.phoneNumber,
    avatar: data?.avatar,
    address: data?.address,
    certificate: data?.certificate,
    identityCard: data?.identityCard,
    numOfPPC: data?.numOfPPC,
  });

  return response.data;
};
