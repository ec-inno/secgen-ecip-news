const path = require('path');
const { languages, defaultLangKey } = require('../languages');

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const itemsPerPage = 10;
  const newsPerLanguage = {};
  const basicPagesPerLanguage = {};

  const result = await graphql(`
    query getDrupalContent {
      allNodeOePage {
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

  // Prepare information about page nodes and their translations.
  oePages.forEach(({ node }) => {
    const langcode = node.id.split('/')[1];

    if (!basicPagesPerLanguage[langcode]) {
      basicPagesPerLanguage[langcode] = [];
    }

    const nodeExists = basicPagesPerLanguage[langcode].find(
      n => n.id === node.id && n.path.langcode === langcode
    );

    // Source plugin will create nodes which are not Drupal content and we don't need these.
    // For this reason, double-check the language from API is node's language, if it's not, it's a source plugin content.
    const isActualNode = node.path.langcode === langcode;

    if (!nodeExists && isActualNode) basicPagesPerLanguage[langcode].push(node);
  });

  // For each item of the default language (English)
  const basicPages = basicPagesPerLanguage[defaultLangKey];

  // Create page for the default language and available translations.
  // When a translation is not available, fallback to English.
  basicPages.forEach(node => {
    const { path: pathauto, id: nodeId } = node;
    const { alias: aliasDefault, langcode: langcodeDefault } = pathauto;
    const uid = nodeId.split('/')[2];

    // Create page for default language.
    createPage({
      path: `/${langcodeDefault}${aliasDefault}`,
      component: path.resolve('./src/templates/basic-page.jsx'),
      context: {
        locale: langcodeDefault,
        alias: aliasDefault,
      },
    });

    // Create pages for the other languages.
    const otherLanguages = languages.map(l => l.lang);
    // Remove default language from the list.
    otherLanguages.splice(otherLanguages.indexOf(defaultLangKey), 1);

    otherLanguages.forEach(language => {
      let alias = aliasDefault;
      let locale = langcodeDefault;
      let pagePath = `/${language}${aliasDefault}`;

      const translation = basicPagesPerLanguage[language].find(n =>
        n.id.includes(uid)
      );

      if (translation) {
        const { path: pathTranslation } = translation;
        const {
          alias: aliasTranslation,
          langcode: localeTranslation,
        } = pathTranslation;

        alias = aliasTranslation;
        locale = localeTranslation;
        pagePath = `/${localeTranslation}${aliasTranslation}`;
      }
      // Create a "placeholder" in the given `language` path and default alias.
      // Passing `langcodeDefault` to fallback to default language for content.
      else {
        alias = aliasDefault;
        locale = langcodeDefault;
        pagePath = `/${language}${aliasDefault}`;
      }

      // Create the page for the non-default language.
      createPage({
        path: pagePath,
        component: path.resolve('./src/templates/basic-page.jsx'),
        context: {
          locale,
          alias,
        },
      });
    });
  });

  // Prepare pagination for news content type.
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

  // Create per-language pages containing collections of nodes.
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
