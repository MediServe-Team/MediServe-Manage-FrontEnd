export const getDaysInMonth = (year, month) => {
  // Note: Tháng trong JavaScript được đánh số từ 0 đến 11
  const lastDayOfMonth = new Date(year, month, 0);
  return lastDayOfMonth.getDate();
};
