const { languages } = require('../languages');

const onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  // Exceptional paths.
  // This goes to /public/404.html, Gatsby seeks it.
  if (page.path === '/404.html') {
    // But we stop the process here as later we manually created the rest of the language-specific 404-s.
    // And we only want /en/404/index.html and not /en/404.html/index.html
    return createPage(page);
  }

  const pageCopy = { ...page };
  deletePage(page);

  // 404 pages for the different languages.
  if (page.path.match(/^\/404/)) {
    return languages.forEach(language => {
      const { lang } = language;

      /* eslint-disable no-param-reassign */
      pageCopy.matchPath = `/${lang}/*`;
      pageCopy.path = `/${lang}${page.path}`;

      return createPage(pageCopy);
    });
  }

  // Client-only page displaying data from an API.
  if (page.path.match(/^\/initiatives/)) {
    return languages.forEach(language => {
      const { lang } = language;

      /* eslint-disable no-param-reassign */
      page.matchPath = `/${lang}/initiatives/*`;

      return createPage({
        ...page,
        path: `/${lang}/initiatives`,
        context: {
          ...page.context,
        },
      });
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
  return languages.forEach(language => {
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
