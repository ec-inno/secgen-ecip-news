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
  siteMetadata: {
    title: "European citizens' initiative",
    description:
      'This site is a participatory democracy instrument that allows citizens to suggest concrete legal changes in any field where the European Commission has power to propose legislation, such as the environment, agriculture, energy, transport or trade.',
    titleTemplate: "%s | European citizens' initiative",
    url: 'https://example.eu', // No trailing slash allowed!
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data/`,
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
        component: require.resolve('./src/components/Layout.jsx'),
      },
    },
    // 'gatsby-plugin-netlify',
  ],
};
