/**
 * Returns a formatted string based on input bytes and decimals values.
 * @param {Number} bytes
 * @param {Number} decimals
 */
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0 || typeof bytes !== 'number') return '0 Bytes';
  if (typeof bytes === 'number' && bytes < 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  /* eslint-disable-next-line prefer-template,no-restricted-properties */
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export default formatBytes;
