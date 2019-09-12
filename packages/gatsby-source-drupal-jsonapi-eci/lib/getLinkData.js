const axios = require('axios');

const getLinkData = async (url, data = [], options) => {
  const { filters, headers, params, basicAuth } = options;
  let linkData;

  // url can be string or object containing href field
  url = url.href;

  // Apply any filters configured in gatsby-config.js. Filters
  // can be any valid JSON API filter query string.
  // See https://www.drupal.org/docs/8/modules/jsonapi/filtering
  if (typeof filters === 'object') {
    if (type in filters) {
      url = url + `?${filters[type]}`;
    }
  }

  try {
    linkData = await axios.get(url, {
      auth: basicAuth,
      headers,
      params,
    });
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

  if (linkData.data.links && linkData.data.links.next) {
    data = await getLinkData(linkData.data.links.next, data);
  }

  return data;
};

module.exports = getLinkData;
