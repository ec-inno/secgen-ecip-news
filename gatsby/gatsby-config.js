const languages = require('./src/languages');

const baseUrl = process.env.SITE_BASE_URL
  ? process.env.SITE_BASE_URL
  : 'http://127.0.0.1:8080/web';

module.exports = {
  siteMetadata: {
    title: "European citizens' initiative",
    description:
      'This site is a participatory democracy instrument that allows citizens to suggest concrete legal changes in any field where the European Commission has power to propose legislation, such as the environment, agriculture, energy, transport or trade.',
    languages,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    // @see https://www.npmjs.com/package/gatsby-plugin-i18n#all-options
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyForNull: 'any',
        langKeyDefault: languages.defaultLangKey,
        useLangKeyLayout: false,
      },
    },
    // The following part could possibly generated based on list of languages.langs without languages.defaultLangKey
    {
      resolve: 'gatsby-source-drupal-oe',
      options: {
        baseUrl,
        apiBase: 'api',
      },
    },
    {
      resolve: 'gatsby-source-drupal-oe',
      options: {
        baseUrl,
        apiBase: 'api',
        language: 'bg',
      },
    },
    {
      resolve: 'gatsby-source-drupal-oe',
      options: {
        baseUrl,
        apiBase: 'api',
        language: 'fr',
      },
    },
  ],
};
