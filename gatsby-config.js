/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const langs = require('./languages');

// Convert array of objects to an array of language codes.
const languages = langs.languages.map(language => language.lang);

const baseUrl = process.env.SITE_BASE_URL
  ? process.env.SITE_BASE_URL
  : 'http://localhost:8080/web';

module.exports = {
  // @see https://www.gatsbyjs.org/docs/api-proxy/
  proxy: {
    prefix: '/initiative',
    url: 'https://ec.europa.eu/citizens-initiative/services',
  },
  // Default title and description.
  siteMetadata: {
    title: "European citizens' initiative",
    description:
      'This site is a participatory democracy instrument that allows citizens to suggest concrete legal changes in any field where the European Commission has power to propose legislation, such as the environment, agriculture, energy, transport or trade.',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/translations/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-transformer-json',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-drupal-jsonapi-eci',
      options: {
        baseUrl,
        apiBase: 'api',
        languages,
        basicAuth: {
          username: process.env.BASIC_AUTH_USERNAME,
          password: process.env.BASIC_AUTH_PASSWORD,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/layout/index.jsx'),
      },
    },
  ],
};
