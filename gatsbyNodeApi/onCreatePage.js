const { languages } = require('../languages');

const onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  deletePage(page);

  if (page.path.match(/^\/initiatives/)) {
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

module.exports = onCreatePage;
