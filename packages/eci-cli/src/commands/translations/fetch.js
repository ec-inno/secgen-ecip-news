module.exports = {
  name: 'fetch',
  run: async toolbox => {
    const {
      http,
      filesystem: { path, read, write },
      print: { info, error },
    } = toolbox;

    info('Fetching translations from Drupal ...');

    const api = http.create({ baseURL: `${process.env.SITE_BASE_URL}/en/api` });
    const payload = read(path('locale/strings.json'), 'json');

    try {
      const translations = await api.post('/string-translations', payload);

      const resources = {};

      translations.data.data.forEach(tSet => {
        let locale = tSet.langcode;

        if (locale === 'pt-pt') {
          // Yes, it is pity, indeed.
          locale = 'pt';
        }

        resources[locale] = { translation: tSet.translations };
      });

      write(path('locale/resources.json'), resources);

      info(`Ready at ${path('locale/resources.json')}`);
    } catch (e) {
      error(
        'An error occured while trying fetch latest translations from Drupal.',
        e
      );
    }
  },
};
