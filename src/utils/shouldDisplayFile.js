/**
 * Checks whether a given file has enough data to be displayed.
 * @param {Object} file
 * @param {Number} file.id
 * @param {Array} file.otherLanguages
 * @returns {Boolean}
 */
const shouldDisplayFile = file => {
  if (!file || typeof file !== 'object') return false;
  if (Array.isArray(file)) return false;

  if (file.id) return true;
  if (file.otherLanguages && Array.isArray(file.otherLanguages)) return true;

  return false;
};

export default shouldDisplayFile;
