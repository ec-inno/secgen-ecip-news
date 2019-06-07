const baseUrl = process.env.SITE_BASE_URL
  ? process.env.SITE_BASE_URL
  : 'http://127.0.0.1:8080/web';

module.exports = {
  siteMetadata: {
    title: "European citizens' initiative",
    description:
      'This site is a participatory democracy instrument that allows citizens to suggest concrete legal changes in any field where the European Commission has power to propose legislation, such as the environment, agriculture, energy, transport or trade.',
  },
  plugins: [
    {
      resolve: `gatsby-source-drupal-oe`,
      options: {
        baseUrl,
        apiBase: `api`,
      },
    },
    {
      resolve: `gatsby-source-drupal-oe`,
      options: {
        baseUrl,
        apiBase: `api`,
        language: 'bg',
      },
    },
  ],
};
