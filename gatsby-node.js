const path = require('path');
const languages = require('./src/languages');

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'node__oe_news') {
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

  const newsPerPage = 10;
  const pagesPerLanguage = {};

  const result = await graphql(`
    query getAllNews {
      allNodeOeNews {
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

  const { allNodeOeNews } = result.data;
  const newsNodes = allNodeOeNews.edges;

  newsNodes.forEach(({ node }) => {
    const { alias, langcode } = node.path;

    if (alias && langcode) {
      const pathInGatsby = `${langcode}${alias}`;

      createPage({
        path: pathInGatsby,
        component: path.resolve('./src/templates/news.jsx'),
        context: {
          alias,
          langcode,
        },
      });

      if (!pagesPerLanguage[langcode]) {
        pagesPerLanguage[langcode] = [];
      }

      const nodeExists = pagesPerLanguage[langcode].find(
        n => n.path.alias === alias && n.path.langcode === langcode
      );

      if (!nodeExists) pagesPerLanguage[langcode].push(node);
    }
  });

  // Create news sections with paginations for each language.
  Object.keys(pagesPerLanguage).forEach(language => {
    const items = pagesPerLanguage[language];
    const languageRegex = `//${language}//`;
    const numPages = Math.ceil(items.length / newsPerPage);

    /* eslint-disable-next-line compat/compat */
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/${language}/news` : `/${language}/news/${i + 1}`,
        component: path.resolve('./src/templates/news-pagination.jsx'),
        context: {
          limit: newsPerPage,
          skip: i * newsPerPage,
          numPages,
          currentPage: i + 1,
          locale: language,
          languageRegex,
        },
      });
    });
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
