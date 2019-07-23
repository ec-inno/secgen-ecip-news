const path = require('path');
const { languages } = require('./languages');

exports.sourceNodes = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type node__faq implements Node {
      title: String
      langcode: String
      translations: [Path!]!
      relationships: FaqEntryRelationship!
    }
    type FaqEntryRelationship {
      field_faq_entries: [FaqEntry]
    }
    type FaqEntry implements Node {
      title: String
      field_answer: ProcessedField
      langcode: String!
      translations: [Path!]!
    }
    type node__oe_news implements Node {
      title: String
      path: Path!
      oe_teaser: ProcessedField!
      oe_summary: ProcessedField!
      field_source: LinkField!
      langcode: String!
      oe_publication_date: Date
      body: ProcessedField!
      translations: [Path!]!
    }
    type Path {
      alias: String!
      langcode: String!
    }
    type ProcessedField {
      processed: String!
    }
    type LinkField {
      title: String
      uri: String
    }
    type NodeTranslation implements Node {
      title: String
      path: Path!
      langcode: String
      translations: [Path!]!
    }
  `;

  return createTypes(typeDefs);
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

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  deletePage(page);

  if (page.path.match(/^\/initiative/)) {
    /* eslint-disable no-param-reassign */
    page.matchPath = '/initiatives/*';
    return createPage({
      ...page,
      context: {
        ...page.context,
        layout: 'dynamic',
      },
    });
  }

  // There are 2 types of landing pages:

  // The language selector, shown in root of the site.
  if (page.path === '/') {
    return createPage({
      ...page,
      context: {
        ...page.context,
        layout: 'landing',
      },
    });
  }

  // Pages for each language.
  return languages.map(language => {
    const { lang } = language;
    // And if the page is `lang.jsx`, treat is a 2nd type of landing page: for the specific language.
    const localizedPath =
      page.path === '/lang/' ? `/${lang}` : `/${lang}${page.path}`;

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
};
