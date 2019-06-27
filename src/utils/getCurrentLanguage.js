/**
 * Extracts current language from `location`.
 *
 * @param {Object} location
 * @returns {String}
 */
const getCurrentLanguage = location => {
  const locations = location.pathname.split('/').filter(p => p);
  return locations[0];
};

export default getCurrentLanguage;
