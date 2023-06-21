import normalizeString from './normalizeString';

const checkSubString = (string, subString) => {
  const str = normalizeString(string).toLowerCase();
  const subStr = normalizeString(subString).toLowerCase();
  return str.includes(subStr);
};

export default checkSubString;
