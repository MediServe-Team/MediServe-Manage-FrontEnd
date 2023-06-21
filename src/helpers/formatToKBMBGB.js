function formatToKBMBGB(bytes, decimals = 2) {
  if (isNaN(bytes)) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const UNITS = ['Bytes', 'Kb', 'Mb', 'Gb'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(dm)} ${UNITS[i]}`;
}

export default formatToKBMBGB;
