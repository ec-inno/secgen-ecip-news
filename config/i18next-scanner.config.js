const { defaultLangKey } = require('../languages');

const exportsFolder = 'i18n_exports';

/**
 * Allow for automated extractions of translatable items.
 * @see https://github.com/i18next/i18next-scanner#default-options
 */
module.exports = {
  input: ['src/**/*.{js,jsx}', 'gatsby/*.js'],
  output: './',
  options: {
    lngs: [defaultLangKey],
    debug: process.env.NODE_ENV === 'development',
    func: {
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.js', '.jsx'],
    },
    resource: {
      savePath: `${exportsFolder}/exported-strings.json`,
    },
    nsSeparator: false,
    keySeparator: false,
  },
};
