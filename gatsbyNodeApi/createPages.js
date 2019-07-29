const path = require('path');
const { languages } = require('../languages');

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const itemsPerPage = 10;
  const newsPerLanguage = {};

  const result = await graphql(`
    query getDrupalContent {
      allNodeOePage {
        edges {
          node {
            path {
              alias
              langcode
            }
          }
        }
      }
      allNodeOeNews {
        edges {
          node {
            id
          }
        }
      }
    }
  `);

  const { allNodeOePage, allNodeOeNews } = result.data;
  const oeNews = allNodeOeNews.edges;
  const oePages = allNodeOePage.edges;

  oePages.forEach(async ({ node }) => {
    const { path: pathauto } = node;
    const { alias, langcode } = pathauto;

    createPage({
      // Drupal's pathauto requires that aliases are starting with `/`
      path: `/${langcode}${alias}`,
      component: path.resolve('./src/templates/basic-page.jsx'),
      context: {
        locale: langcode,
        alias,
      },
    });
  });

  // Prepare pagination.
  oeNews.forEach(({ node }) => {
    const langcode = node.id.split('/')[1];

    if (!newsPerLanguage[langcode]) {
      newsPerLanguage[langcode] = [];
    }

    const nodeExists = newsPerLanguage[langcode].find(
      n => n.id === node.id && n.path.langcode === langcode
    );

    if (!nodeExists) newsPerLanguage[langcode].push(node);
  });

  languages
    .map(l => l.lang)
    .forEach(language => {
      const languageRegex = `//${language}//`;

      // Create news sections with paginations for each language.
      const items = newsPerLanguage[language];
      const numPages = items ? Math.ceil(items.length / itemsPerPage) : 1;

      /* eslint-disable-next-line compat/compat */
      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/${language}/news` : `/${language}/news/${i + 1}`,
          component: path.resolve('./src/templates/news-pagination.jsx'),
          context: {
            limit: itemsPerPage,
            skip: i * itemsPerPage,
            numPages,
            currentPage: i + 1,
            locale: language,
            languageRegex,
          },
        });
      });

      // Create FAQ page with sections and sub-items.
      createPage({
        path: `/${language}/faq`,
        component: path.resolve('./src/templates/faq-page.jsx'),
        context: {
          locale: language,
          languageRegex,
        },
      });
    });
};

module.exports = createPages;
