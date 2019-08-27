const path = require('path');
const has = require('lodash/has');

const { languages, defaultLangKey } = require('../languages');

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const itemsPerPage = 10;
  const newsPerLanguage = {};

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

  // We'll start off the default (English) language.
  const basicPages = oePages.filter(({ node }) =>
    node.id.includes(`/${defaultLangKey}/`)
  );

  const otherLanguages = languages.map(l => l.lang);
  // Remove default language from the list.
  otherLanguages.splice(otherLanguages.indexOf(defaultLangKey), 1);

  basicPages.forEach(({ node }) => {
    const { path: pathauto, id: nodeId } = node;
    const { alias: aliasDefault, langcode: languageDefault } = pathauto;
    const uid = nodeId.split('/')[2];

    // Create a page for the default language.
    createPage({
      path: `/${languageDefault}${aliasDefault}`,
      component: path.resolve('./src/templates/basic-page.jsx'),
      context: {
        locale: languageDefault,
        langcode: languageDefault,
        alias: aliasDefault,
      },
    });

    otherLanguages.forEach(language => {
      // Try to find a translation.
      const translation = oePages.find(
        ({ node: oePage }) =>
          oePage.id.includes(`${language}/${uid}`) &&
          has(oePage, 'path.langcode') &&
          oePage.path.langcode === language
      );

      // Respect translation's alias if there is one.
      const alias =
        translation && has(translation, 'path.alias')
          ? translation.path.alias
          : aliasDefault;

      // Fallback to default language for the content.
      const langcode = translation ? language : languageDefault;

      createPage({
        path: `/${language}${alias}`,
        component: path.resolve('./src/templates/basic-page.jsx'),
        context: {
          locale: language,
          // If translation has a different path than original language, language switcher won't land user to translation.
          // It's unlikely, but it's worth noting we respect paths from Drupal even if that would cause issues in Gatsby.
          langcode,
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
