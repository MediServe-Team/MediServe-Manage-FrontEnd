export const getProfileServices = async (axiosWithToken) => {
  const response = await axiosWithToken.get('/me/profile');
  return response.data;
};

export const updateProfileServices = async (axiosWithToken, data) => {
  const response = await axiosWithToken.put('/me/update-info', {
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
