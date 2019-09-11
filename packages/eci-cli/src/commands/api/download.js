module.exports = {
  name: 'download',
  run: async toolbox => {
    const { SITE_BASE_URL: baseURL } = process.env;

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

    // Inline utility to get links data.
    const getLinkData = async (url, data = []) => {
      let linkData;
      const resourcePath = url.replace(baseURL, '');

      try {
        linkData = await client.get(url);
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

      data = data.concat(linkData.data.data);
      write(path(`drupal_jsonapi/${resourcePath}/data.json`), data);

      if (linkData.data.links.next) {
        data = await getLinkData(linkData.data.links.next, data);
      }

      return data;
    };

    info('Making a local copy of a JSONAPI endpoint ...');

    try {
      languages.map(async language => {
        const resource = `${language}/api`;
        const response = await client.get(`/${resource}`);

        write(path(`drupal_jsonapi/${resource}/data.json`), response.data);

        const { links } = response.data;

        if (links) {
          // Correction for Drupal's JSON API issue dropping language.
          const defaultEndpoint = `${baseURL}/api`;
          const languageEndpoint = `${baseURL}/${language}/api`;

          Object.keys(links).map(async type => {
            if (type !== 'self') {
              const url = links[type].href.replace(
                defaultEndpoint,
                languageEndpoint
              );

              getLinkData(url);
            }
          });
        }
      });
    } catch (e) {
      error(`An error occured while communicating with ${baseURL}`, e);
    }
  },
};
