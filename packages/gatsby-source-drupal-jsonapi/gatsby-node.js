const axios = require('axios');
const _ = require('lodash');

const getLinkData = require('./lib/getLinkData');
const getNodes = require('./lib/getNodes');

// @see https://www.gatsbyjs.org/docs/node-apis/#sourceNodes
exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest, reporter },
  { apiBase, baseUrl, basicAuth, filters, headers, languages, params }
) => {
  const { createNode } = actions;

  // Defaults.
  apiBase = apiBase || 'jsonapi';
  languages = languages || [];

  const nodes = [];
  const entityTypes = [
    'node--faq',
    'node--faq_section',
    'node--oe_news',
    'node--oe_page',
    'menu',
  ];

  reporter.info('Getting content from Drupal ...');

  for (const language of languages) {
    const endpoint = `${baseUrl}/${language}/${apiBase}`;

    const resourceEndpoints = await axios.get(endpoint, {
      auth: basicAuth,
      headers,
      params,
    });

    const dataAll = await Promise.all(
      _.map(resourceEndpoints.data.links, async (url, type) => {
        let published = [];
        let drafts = [];

        // Early exit on insufficient or edge case input.
        if (!type || !url || type === 'self' || !entityTypes.includes(type))
          return;

        const defaultEndpoint = `${baseUrl}/${apiBase}`;
        const languageEndpoint = `${baseUrl}/${language}/${apiBase}`;

        if (url.href && !url.href.includes('skos')) {
          // Drupal's JSON:API needs corrections for its language dropping in links.
          url.href = url.href.replace(defaultEndpoint, languageEndpoint);

          published = await getLinkData(url, [], {
            filters,
            headers,
            params,
            basicAuth,
          });

          if (process.env.DRAFT_PREVIEW && type !== 'menu') {
            url.href += '?resourceVersion=rel%3Aworking-copy';

            drafts = await getLinkData(url, [], {
              filters,
              headers,
              params,
              basicAuth,
            });
          }

          const data = [...published, ...drafts];

          return {
            type,
            data,
          };
        }
      })
    );

    const allResources = dataAll.filter(item => item);

    // Content for the given language.
    const nodesLanguage = getNodes({
      allResources,
      apiBase,
      language,
      createNodeId,
      createContentDigest,
    });

    nodes.push(...nodesLanguage);
  }

  for (const node of nodes) {
    createNode(node);
  }
};
