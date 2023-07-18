const normalizeString = (str) => {
  // using type NFD
  let normalStr = str.normalize('NFD');
  // exclude sign in vietnameses
  normalStr = normalStr.replace(/[\u0300-\u036f]/g, '');
  // convert đ/Đ to d/D
  normalStr = normalStr.replace(/[đĐ]/g, (m) => (m === 'đ' ? 'd' : 'D'));
  return normalStr;
};

export default normalizeString;
