import { axiosBase } from '../../lib/axios';

export const getProfileServices = (token) => {
  return axiosBase.get('/me/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfileServices = async (token, data) => {
  const response = await axiosBase.put(
    '/me/update-info',
    {
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
    },
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return response.data;
};
