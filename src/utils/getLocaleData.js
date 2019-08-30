const { defaultLangKey } = require('../../languages');

const exportsFolder = 'i18n_exports';

const getLocaleData = lang => {
  if (!lang) return {};

  try {
    const localeData = require(`../../${exportsFolder}/resources.json`);
    if (localeData[lang]) return localeData[lang];
    if (localeData[defaultLangKey]) return localeData[defaultLangKey];
  } catch (error) {
    console.error(`Missing file ${exportsFolder}/resources.json`);
  }

  return {};
};

module.exports = getLocaleData;
