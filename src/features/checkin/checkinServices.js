export const getMyCheckinServices = async (axiosWithToken, month, year) => {
  const response = await axiosWithToken.get(`/me/list-checkin?month=${month}&year=${year}`);
  return response.data;
};

export const getCheckinToday = async (axiosWithToken) => {
  const response = await axiosWithToken.get(`/me/checkin-today`);
  return response.data;
};

export const checkin = async (axiosWithToken) => {
  const response = await axiosWithToken.post(`/me/checkin`);
  return response.data;
};

export const checkout = async (axiosWithToken) => {
  const response = await axiosWithToken.put('/me/checkout');
  return response;
};
