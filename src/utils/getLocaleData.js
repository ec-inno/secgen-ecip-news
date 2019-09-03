/* eslint-disable */
const path = require('path');

const exportsFolder = 'i18n_exports';

const getLocaleData = lang => {
  if (!lang) return {};

  const file = path.resolve(
    __dirname,
    `../../${exportsFolder}/translations/${lang}.json`
  );

  try {
    const localeData = require(file);

    if (Object.keys(localeData).length) {
      return localeData;
    }
  } catch (error) {
    const localeDataDefault = {};

    const exportedStrings = require(`../../${exportsFolder}/exported-strings.json`);

    Object.keys(exportedStrings).forEach(
      field => (localeDataDefault[field] = field)
    );

    return localeDataDefault;
  }
};

module.exports = getLocaleData;
