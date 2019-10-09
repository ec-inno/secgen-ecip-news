require('dotenv').config();

// Project-wide configurations.
const entities = require('./config/entities.json');
const languages = require('./config/languages.json');

const baseUrl = process.env.GATSBY_DRUPAL_API || 'http://localhost:8080/web';

module.exports = {
  // Default title and description.
  siteMetadata: {
    title: "European citizens' initiative",
    description:
      'This site is a participatory democracy instrument that allows citizens to suggest concrete legal changes in any field where the European Commission has power to propose legislation, such as the environment, agriculture, energy, transport or trade.',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-layout',
    'gatsby-plugin-remove-trailing-slashes',
    {
      resolve: '@eci/gatsby-source-drupal-jsonapi',
      options: {
        baseUrl,
        entities,
        languages,
        apiBase: 'api',
        basicAuth: {
          username: process.env.BASIC_AUTH_USERNAME,
          password: process.env.BASIC_AUTH_PASSWORD,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: "European citizens' initiative",
        short_name: "European citizens' initiative",
        start_url: '/',
        background_color: '#034ea1',
        theme_color: '#034ea1',
        display: 'standalone',
        icon: 'static/logo.png',
      },
    },
  ],
};
