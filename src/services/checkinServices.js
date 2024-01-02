export const getListCheckinOfUserService = async (axiosWithToken, staffId, month, year) => {
  const response = await axiosWithToken.get(`/checkins/of-user/${staffId}?month=${month}&year=${year}`);
  return response.data;
};
