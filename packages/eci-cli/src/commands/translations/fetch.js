const exportsFolder = 'i18n_exports';

module.exports = {
  name: 'fetch',
  run: async toolbox => {
    const {
      http,
      filesystem: { path, read, write },
      print: { info, error },
    } = toolbox;

    info('Fetching translations ...');

    const api = http.create({
      baseURL: `${process.env.GATSBY_DRUPAL_API}/en/api`,
    });

    const exportedStrings = read(
      path(`${exportsFolder}/exported-strings.json`),
      'json'
    );

    if (!exportedStrings) {
      error(`${exportsFolder}/exported-strings.json missing`);
      error('Please export translatable strings: yarn i18n:export');
      info('You can do export and fetch at once: yarn i18n:update');
      return;
    }

    /**
     * Keep default's/original language information.
     * Drupal does not return default (en) language, but i18next's init function needs it.
     */
    const defaultLangKey = 'en';
    const original = {};
    const payload = Object.keys(exportedStrings);
    payload.forEach(key => (original[key] = key));

    info(`Saving strings defaults for: "${defaultLangKey}"`);
    write(
      path(`${exportsFolder}/translations/${defaultLangKey}.json`),
      original
    );

    try {
      const response = await api.post('/string-translations', payload);

      if (response.data && response.data.data) {
        response.data.data.forEach(item => {
          let locale = item.langcode;
          const translation = item.translations;

          if (locale === 'pt-pt') {
            // Yes, it is pity, indeed.
            locale = 'pt';
          }

          write(
            path(`${exportsFolder}/translations/${locale}.json`),
            translation
          );
        });

        info('Done fetching translations.');
      }
    } catch (e) {
      error("Counldn't fetch translations.", e);
    }
  },
};
