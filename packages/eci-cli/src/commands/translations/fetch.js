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

    const api = http.create({ baseURL: `${process.env.SITE_BASE_URL}/en/api` });
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

    const payload = Object.keys(exportedStrings);

    try {
      const resources = {};
      const response = await api.post('/string-translations', payload);

      if (response.data && response.data.data) {
        response.data.data.forEach(item => {
          let locale = item.langcode;

          if (locale === 'pt-pt') {
            // Yes, it is pity, indeed.
            locale = 'pt';
          }

          resources[locale] = { translation: item.translations };
        });

        write(path(`${exportsFolder}/resources.json`), resources);
        info('Done fetching translations.');
      }
    } catch (e) {
      error(
        'An error occured while trying fetch latest translations from translations.',
        e
      );
    }
  },
};
