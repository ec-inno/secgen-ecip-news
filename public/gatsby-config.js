const baseUrl = process.env.SITE_BASE_URL
  ? process.env.SITE_BASE_URL
  : "http://127.0.0.1:8080/web"

module.exports = {
  siteMetadata: {
    title: "European citizens' initiative",
  },
  plugins: [
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl,
        apiBase: `api`,
      },
    },
  ],
}
