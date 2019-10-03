const path = require('path');
const i18n = require('i18next');
const i18nBackend = require('i18next-sync-fs-backend');
const { defaultLangKey, languages } = require('../../languages');

const exportsFolder = 'i18n_exports';

const setup = () => {
  i18n.use(i18nBackend).init({
    // debug: true,
    preload: languages.map(item => item.lang),
    ns: 'translations',
    defaultNS: 'translations',
    fallbackLng: defaultLangKey,
    load: 'languageOnly',
    initImmediate: false,
    backend: {
      loadPath: path.resolve(
        __dirname,
        `../../${exportsFolder}/{{ns}}/{{lng}}.json`
      ),
    },
  });

  return i18n;
};

module.exports = setup;
