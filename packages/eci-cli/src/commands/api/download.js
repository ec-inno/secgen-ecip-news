module.exports = {
  name: 'download',
  run: async toolbox => {
    // We care only for these at the moment.
    const entityTypes = [
      'node--faq',
      'node--faq_section',
      'node--oe_news',
      'node--oe_page',
      'menu',
    ];

    const { SITE_BASE_URL: baseURL } = process.env;
    const localhost = 'http://localhost:3000';

    if (!baseURL) {
      return error('Cannot work without value for SITE_BASE_URL.');
    }

    // Dependencies.
    const getLanguages = require('../../utils/getLanguages');
    const languages = getLanguages();

    const {
      http,
      filesystem: { path, write },
      print: { info, error },
    } = toolbox;

    const client = http.create({ baseURL });

    const updateLinksToLocal = o => {
      Object.keys(o).forEach(k => {
        // Make the change.
        if (k === 'href') {
          o[k] = o[k].replace(baseURL, localhost);
        }
        // Recurse if nested.
        if (o[k] !== null && typeof o[k] === 'object') {
          updateLinksToLocal(o[k]);
        }
      });
    };

    const saveData = (resourcePath, data) =>
      write(path(`drupal_jsonapi/${resourcePath}/data.json`), data);

    const getData = async (url, data = []) => {
      let response;

      try {
        response = await client.get(url);
      } catch (error) {
        if (
          error.response &&
          error.response.status &&
          error.response.status === 405
        ) {
          // The endpoint doesn't support the GET method, so just skip it.
          return [];
        } else {
          console.error(`Failed to fetch ${url}`, error.message);
          console.error(error);
          throw error;
        }
      }

      data = data.concat(response.data.data);

      if (response.data.links.next) {
        data = await getData(response.data.links.next, data);
      }

      return { data, ...response.data };
    };

    info('Downloading JSON API data locally  ...');

    try {
      languages.map(async language => {
        const resource = `${language}/api`;
        const response = await client.get(`/${resource}`);
        const { links } = response.data;

        // The initial list of entityTypes.
        saveData(resource, response.data);

        if (links) {
          // Correction for Drupal's JSON API issue dropping the language.
          // Make the correction at this stage in order to follow `links` crrectly.
          const defaultEndpoint = `${baseURL}/api`;
          const languageEndpoint = `${baseURL}/${language}/api`;

          Object.keys(links).map(async type => {
            if (type === 'self' || !entityTypes.includes(type)) return;

            const url = links[type].href.replace(
              defaultEndpoint,
              languageEndpoint
            );

            const data = await getData(url);

            // Remove the base URL to create a local mirror of the resource.
            const resourcePath = url.replace(baseURL, '');
            // Convert the other links inside the data for local use too.
            updateLinksToLocal(data);
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
