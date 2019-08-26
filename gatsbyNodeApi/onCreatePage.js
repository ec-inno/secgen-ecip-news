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

  /**
   * Initiatives are client-only asset fetched and displayed from external API.
   */

  // Initiative details page.
  if (page.path.match(/^\/initiative/)) {
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

  // Initiatives search.
  if (page.path.match(/^\/find-initiative/)) {
    return languages.forEach(language => {
      const { lang } = language;

      /* eslint-disable no-param-reassign */
      page.matchPath = `/${lang}/find-initiative/*`;

      return createPage({
        ...page,
        path: `/${lang}/find-initiative`,
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
    const localizedPath =
      page.path === '/home/' ? `/${lang}` : `/${lang}${page.path}`;

    const languageRegex = `//${lang}//`;

    return createPage({
      ...page,
      path: localizedPath,
      context: {
        ...page.context,
        locale: lang,
        languageRegex,
      },
    });
  });
};

module.exports = onCreatePage;
