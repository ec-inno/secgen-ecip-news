const { languages } = require('../../languages');

/**
 * Extracts current language from `location`.
 *
 * @param {Object} location
 * @returns {String}
 */
const getCurrentLanguage = location => {
  if (location && location.pathname) {
    const validLanguages = languages.map(l => l.lang);
    const locations = location.pathname.split('/').filter(p => p);
    return validLanguages.find(l => l === locations[0]);
  }
  return undefined;
};

export default getCurrentLanguage;
