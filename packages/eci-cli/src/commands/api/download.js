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

    const saveDataLocally = (resourcePath, data) => {
      const updated = JSON.parse(JSON.stringify(data));

      const convertLinksToRelative = o => {
        Object.keys(o).forEach(k => {
          // Make the change.
          if (k === 'href') {
            o[k] = o[k].replace(baseURL, '');
          }
          // Recurse if nested.
          if (o[k] !== null && typeof o[k] === 'object') {
            convertLinksToRelative(o[k]);
          }
        });
      };

      convertLinksToRelative(updated);

      write(path(`drupal_jsonapi/${resourcePath}/data.json`), updated);
    };

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

      saveDataLocally(resourcePath, data);

      if (linkData.data.links.next) {
        data = await getLinkData(linkData.data.links.next, data);
      }

      return data;
    };

    info('Making a local copy of the JSONAPI ...');

    try {
      languages.map(async language => {
        const resource = `${language}/api`;
        const response = await client.get(`/${resource}`);

        saveDataLocally(resource, response.data);

        const { links } = response.data;

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

            getLinkData(url);
          });
        }
      });
    } catch (e) {
      error(`An error occured while communicating with ${baseURL}`, e);
    }
  },
};
