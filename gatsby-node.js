const path = require('path');
const languages = require('./src/languages');

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
  createTypes(typeDefs);
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (
    node.internal.type === 'node__oe_news' ||
    node.internal.type === 'node__faq_section'
  ) {
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
  languages.langs.forEach(language => {
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
  languages.langs.forEach(language => {
    const languageRegex = `//${language}//`;

    /* eslint-disable-next-line compat/compat */
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
