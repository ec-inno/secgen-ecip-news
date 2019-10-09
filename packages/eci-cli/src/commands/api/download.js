/* eslint no-param-reassign: 0 */

module.exports = {
  name: 'download',
  run: async toolbox => {
    const {
      http,
      filesystem: { read, write },
      parameters: { options },
      print: { info, error },
    } = toolbox;

    let apiBase = 'api';
    let entities = [];
    let languages = [];
    let folder =
      process.env.DRUPAL_JSONAPI_OFFLINE_FOLDER || 'api/drupal/jsonapi';

    if (options.entities) {
      const list = options.entities.split(',').filter(o => o);
      entities.push(...list);
    }

    if (options.entitiesConfig) {
      const listConfig = read(options.entitiesConfig, 'json');
      entities.push(...listConfig);
    }

    entities = [...new Set(entities)];

    if (entities.length === 0) {
      error('List of entities is required.');
      info('Use either --entities or ---entitiesConfig options');
      return;
    }

    if (options.languages) {
      const list = options.languages.split(',').filter(o => o);
      languages.push(...list);
    }

    if (options.languagesConfig) {
      const listConfig = read(options.languagesConfig, 'json');
      languages.push(...listConfig);
    }

    languages = [...new Set(languages)];

    if (languages.length === 0) {
      error('List of languages is required.');
      info('Use either --languages or ---languagesConfig options');
      return;
    }

    const { GATSBY_DRUPAL_API: baseURL } = process.env;

    if (!baseURL) {
      error('Cannot work without value for GATSBY_DRUPAL_API.');
      return;
    }

    if (options.folder) {
      folder = options.folder;
      info(`Custom location set: ${folder}`);
    }

    if (options.apiBase) {
      apiBase = options.apiBase;
      info(`Custom API base set: ${apiBase}`);
    }

    const client = http.create({ baseURL });

    /**
     * Local helpers.
     */
    const getData = async (url, data = []) => {
      let response;

      try {
        response = await client.get(url);
      } catch (e) {
        error(`Failed to fetch ${url}`, e.message);
        return [];
      }

      data = data.concat(response.data.data);

      if (response.data.links.next) {
        data = await getData(response.data.links.next, data);
      }

      return { data, ...response.data };
    };

    const saveData = (resourcePath, data) =>
      write(`${folder}/${resourcePath}/data.json`, data);

    /**
     * Start the process.
     */
    info('Downloading JSON:API data locally  ...');

    try {
      languages.map(async language => {
        const resource = `${language}/${apiBase}`;
        const response = await client.get(`/${resource}`);

        if (response.problem) {
          if (response.problem === 'CONNECTION_ERROR') {
            error('You need internet connection to download data.');
          } else {
            error(response.problem);
          }
          return;
        }

        const { links } = response.data;

        // The initial list of entities.
        saveData(resource, response.data);

        if (links) {
          // Correction for Drupal's JSON:API issue dropping the language.
          // Make the correction at this stage in order to follow `links` crrectly.
          const defaultEndpoint = `${baseURL}/${apiBase}`;
          const languageEndpoint = `${baseURL}/${language}/${apiBase}`;

          Object.keys(links).map(async type => {
            if (type === 'self' || !entities.includes(type)) return;

            const url = links[type].href.replace(
              defaultEndpoint,
              languageEndpoint
            );

            const data = await getData(url);

            // Remove the base URL to create a local mirror of the resource.
            const resourcePath = url.replace(baseURL, '');

            // Persist it.
            saveData(resourcePath, data);
          });
        }
      });
    } catch (e) {
      error(`An error occured while communicating with ${baseURL}`, e);
    }
  },
};
