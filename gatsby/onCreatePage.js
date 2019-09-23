const { languages, defaultLangKey } = require('../languages');
const getLocaleData = require('../src/utils/getLocaleData');

const onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  deletePage(page);

  // Exceptional paths.
  if (page.path === '/404.html' || page.path.match(/^\/dev-404-page/)) {
    // But we stop the process here as later we manually created the rest of the language-specific 404-s.
    // And we only want /en/404/index.html and not /en/404.html/index.html
    return createPage({
      ...page,
      context: {
        ...page.context,
        locale: defaultLangKey,
        localeData: getLocaleData(defaultLangKey),
      },
    });
  }

  // 404 pages for the different languages.
  if (page.path.match(/^\/404/)) {
    return languages.forEach(language => {
      const { lang } = language;

      return createPage({
        ...page,
        matchPath: `/${lang}/*`,
        path: `/${lang}${page.path}`,
        context: {
          ...page.context,
          locale: lang,
          localeData: getLocaleData(lang),
        },
      });
    });
  }

  /**
   * Initiatives are client-only asset fetched and displayed from external API.
   */

  // Initiative details page.
  if (page.path.match(/^\/initiative/)) {
    return languages.forEach(language => {
      const { lang } = language;

      return createPage({
        ...page,
        matchPath: `/${lang}/initiatives/*`,
        path: `/${lang}/initiatives`,
        context: {
          ...page.context,
          locale: lang,
          localeData: getLocaleData(lang),
        },
      });
    });
  }

  // Initiatives search.
  if (page.path.match(/^\/find-initiative/)) {
    return languages.forEach(language => {
      const { lang } = language;

      return createPage({
        ...page,
        matchPath: `/${lang}/find-initiative/*`,
        path: `/${lang}/find-initiative`,
        context: {
          ...page.context,
          locale: lang,
          localeData: getLocaleData(lang),
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
        locale: defaultLangKey,
        localeData: getLocaleData(defaultLangKey),
      },
    });
  }

  // Pages for each language.
  return languages.forEach(language => {
    const { lang } = language;
    const localizedPath =
      page.path === '/home' ? `/${lang}` : `/${lang}${page.path}`;

    return createPage({
      ...page,
      path: localizedPath,
      context: {
        ...page.context,
        locale: lang,
        localeData: getLocaleData(lang),
        languageRegex: `//${lang}//`,
      },
    });
  });
};

module.exports = onCreatePage;
