const path = require('path');
const { languages } = require('../languages');

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const newsPerPage = 10;
  const pagesPerLanguage = {};

  const result = await graphql(`
    query getAllNews {
      allNodeOeNews {
        edges {
          node {
            id
          }
        }
      }
    }
  `);

  const { allNodeOeNews } = result.data;
  const newsNodes = allNodeOeNews.edges;

  // Helps counting content per language for pagination.
  newsNodes.forEach(({ node }) => {
    const langcode = node.id.split('/')[1];

    if (!pagesPerLanguage[langcode]) {
      pagesPerLanguage[langcode] = [];
    }

    const nodeExists = pagesPerLanguage[langcode].find(
      n => n.id === node.id && n.path.langcode === langcode
    );

    if (!nodeExists) pagesPerLanguage[langcode].push(node);
  });

  // Create news sections with paginations for each language.
  languages
    .map(l => l.lang)
    .forEach(language => {
      const items = pagesPerLanguage[language];
      const languageRegex = `//${language}//`;
      const numPages = items ? Math.ceil(items.length / newsPerPage) : 1;

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

  // Create faq sections with paginations for each language.
  languages
    .map(l => l.lang)
    .forEach(language => {
      const languageRegex = `//${language}//`;

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
