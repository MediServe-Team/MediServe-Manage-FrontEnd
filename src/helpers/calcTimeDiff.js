function calcTimeDiff(timeStringA, timeStringB) {
  const timeA = new Date(timeStringA);
  const timeB = new Date(timeStringB);

  // Tính hiệu giữa hai thời điểm
  const timeDifference = timeB - timeA;

  // Chuyển đổi khoảng cách thời gian từ miligiây sang giờ và phút
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  // Định dạng kết quả
  const formattedResult = `${hours} giờ ${minutes} phút`;

  return formattedResult;
}

export default calcTimeDiff;
