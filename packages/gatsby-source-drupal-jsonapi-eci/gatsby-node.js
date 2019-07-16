const axios = require('axios');
const _ = require('lodash');

const getLinkData = require('./lib/getLinkData');
const getNodes = require('./lib/getNodes');
const addNodeTranslations = require('./lib/addNodeTranslations');
const createTranslationNode = require('./lib/createTranslationNode');

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
  const contentTypes = [
    'node--faq',
    'node--faq_section',
    'node--oe_news',
    'node--oe_page',
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
        if (!type || !url || type === 'self' || !contentTypes.includes(type))
          return;

        const defaultEndpoint = `${baseUrl}/${apiBase}`;
        const languageEndpoint = `${baseUrl}/${language}/${apiBase}`;

        if (url.href && !url.href.includes('skos')) {
          // Drupal's JSONAPI needs corrections for its language dropping in links.
          url.href = url.href.replace(defaultEndpoint, languageEndpoint);

          published = await getLinkData(url, [], {
            filters,
            headers,
            params,
            basicAuth,
          });

          if (process.env.DRAFT_PREVIEW) {
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

  // No internal pages for news or faq pages for the moment.
  addNodeTranslations(nodes);

  for (const node of nodes) {
    // Create a gatsby node for everything from Drupal: menus, blocks, content types, etc.
    createNode(node);

    createTranslationNode({
      node,
      createNodeId,
      createContentDigest,
      createNode,
    });
  }
};
