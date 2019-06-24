const path = require('path');
const languages = require('./src/languages');

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'news') {
    // Create a new field on Gatsby side to later store information about translations of a given node.

    createNodeField({
      name: 'translations',
      node,
      value: [],
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query getAllNews {
      allNews {
        edges {
          node {
            id
            path {
              alias
              langcode
            }
          }
        }
      }
    }
  `);

  const { allNews } = result.data;
  const newsNodes = allNews.edges;

  newsNodes.forEach(({ node }) => {
    const { alias, langcode } = node.path;

    if (alias && langcode) {
      const pathInGatsby = `${langcode}${alias}`;

      createPage({
        path: pathInGatsby,
        component: path.resolve(`./src/templates/news.jsx`),
        context: {
          alias,
          langcode,
        },
      });
    }
  });
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  try {
    deletePage(page);

    return languages.langs.map(lang => {
      const localizedPath = `${lang}${page.path}`;
      const languageRegex = `//${lang}//`;

      return createPage({
        ...page,
        path: localizedPath,
        // Be extra careful with context: https://www.gatsbyjs.org/docs/creating-and-modifying-pages/#pass-context-to-pages
        context: {
          ...page.context,
          locale: lang,
          languageRegex,
        },
      });
    });
  } catch (error) {
    throw error;
  }
};
