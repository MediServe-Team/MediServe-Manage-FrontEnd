const formatTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  dateTime.setHours(dateTime.getHours() - 7);

  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();

  // Định dạng thành chuỗi "HH:mm:ss"
  return `${hours <= 9 ? '0' + hours : hours}:${minutes <= 9 ? '0' + minutes : minutes}:${
    seconds <= 9 ? '0' + seconds : seconds
  }`;
};

export default formatTime;
