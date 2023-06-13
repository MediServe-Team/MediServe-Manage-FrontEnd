const dateToString = (dateTime) => {
  const newDate = new Date(dateTime);
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  return `${date}/${month}/${year}`;
};

export default dateToString;
