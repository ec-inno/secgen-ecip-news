const { languages, defaultLangKey } = require('../languages');
const getLocaleData = require('../src/utils/getLocaleData');

const onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

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

  deletePage(page);

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

  // Client-only page displaying data from an API.
  if (page.path.match(/^\/initiative/)) {
    return languages.forEach(language => {
      const { lang } = language;

      return createPage({
        ...page,
        matchPath: `/${lang}/initiative/*`,
        path: `/${lang}/initiative`,
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
      page.path === '/home/' ? `/${lang}` : `/${lang}${page.path}`;

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
