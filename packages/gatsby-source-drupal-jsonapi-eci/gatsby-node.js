const axios = require('axios');
const _ = require('lodash');

const getLinkData = require('./lib/getLinkData');
const nodeFromData = require('./lib/nodeFromData');
const addNodeTranslations = require('./lib/addNodeTranslations');

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
  // Drupal content entities which tak on getting working copies
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
        // Early exit on insufficient or edge case input.
        if (!type || !url || type === 'self' || !contentTypes.includes(type))
          return;

        const defaultEndpoint = `${baseUrl}/${apiBase}`;
        const languageEndpoint = `${baseUrl}/${language}/${apiBase}`;

        if (url.href && !url.href.includes('skos')) {
          // Drupal's JSONAPI needs corrections for its language dropping in links.
          url.href = url.href.replace(defaultEndpoint, languageEndpoint);

          const published = await getLinkData(url, [], {
            filters,
            headers,
            params,
            basicAuth,
          });

          if (process.env.DRAFT_PREVIEW) {
            url.href += '?resourceVersion=rel%3Aworking-copy';
          }

          const drafts = await getLinkData(url, [], {
            filters,
            headers,
            params,
            basicAuth,
          });

          const data = [...published, ...drafts];

          return {
            type,
            data,
          };
        }
      })
    );

    const allResources = dataAll.filter(item => item);

    debugger;
    // Make list of all IDs so we can check against that when creating relationships.
    const ids = {};
    _.each(allResources, contentType => {
      if (!contentType) return;
      _.each(contentType.data, datum => {
        ids[datum.id] = true;
      });
    });

    // Create back references.
    const backRefs = {};

    // Adds back reference to linked entity, so we can later add node link.
    const addBackRef = (linkedId, sourceDatum) => {
      if (ids[linkedId]) {
        if (!backRefs[linkedId]) {
          backRefs[linkedId] = [];
        }
        backRefs[linkedId].push({
          id: sourceDatum.id,
          type: sourceDatum.type,
        });
      }
    };

    _.each(allResources, contentType => {
      if (!contentType) return;
      _.each(contentType.data, datum => {
        if (datum.relationships) {
          _.each(datum.relationships, (v, k) => {
            if (!v.data) return;

            if (_.isArray(v.data)) {
              v.data.forEach(data => addBackRef(data.id, datum));
            } else {
              addBackRef(v.data.id, datum);
            }
          });
        }
      });
    });

    // The namespace is not matching jsonapi/drupal pattern!
    // It's apiBase/language and not language/apiBase.
    // It's used to namespace nodes and their ids, not for api calls!
    const apiLanguageBasedNamespace = `${apiBase}/${language}`;

    _.each(allResources, contentType => {
      if (!contentType) return;

      _.each(contentType.data, datum => {
        const node = nodeFromData(
          datum,
          createNodeId,
          apiLanguageBasedNamespace
        );

        node.relationships = {};

        // Add relationships
        if (datum.relationships) {
          _.each(datum.relationships, (v, k) => {
            if (!v.data) return;
            if (_.isArray(v.data) && v.data.length > 0) {
              // Create array of all ids that are in our index
              node.relationships[`${k}___NODE`] = _.compact(
                v.data.map(data =>
                  ids[data.id]
                    ? `${apiLanguageBasedNamespace}/${createNodeId(data.id)}`
                    : null
                )
              );
            } else if (ids[v.data.id]) {
              node.relationships[
                `${k}___NODE`
              ] = `${apiLanguageBasedNamespace}/${createNodeId(v.data.id)}`;
            }
          });
        }

        // Add back reference relationships.
        // Back reference relationships will need to be arrays,
        // as we can't control how if node is referenced only once.
        if (backRefs[datum.id]) {
          backRefs[datum.id].forEach(ref => {
            if (!node.relationships[`${ref.type}___NODE`]) {
              node.relationships[`${ref.type}___NODE`] = [];
            }

            node.relationships[`${ref.type}___NODE`].push(
              `${apiLanguageBasedNamespace}/${createNodeId(ref.id)}`
            );
          });
        }

        if (_.isEmpty(node.relationships)) {
          delete node.relationships;
        }

        node.internal.contentDigest = createContentDigest(node);
        nodes.push(node);
      });
    });
  }

  addNodeTranslations(nodes);

  for (const node of nodes) {
    // Create a gatsby node for everything from Drupal: menus, blocks, content types, etc.
    createNode(node);

    // Having a path and translations, this means it's a node with path from pathauto.
    // In order to expose this information globally in any component in gatsby, we'll also create a gatsby node for translation's information.
    if (node.path && node.translations && node.translations.length) {
      const { path, translations, drupal_internal__nid } = node;

      const translation = {
        translations,
        path,
      };

      const nodeContent = JSON.stringify(translation);

      const nodeMeta = {
        id: createNodeId(
          `${drupal_internal__nid}/${path.langcode}/${path.alias}`
        ),
        parent: null,
        children: [],
        internal: {
          type: 'node__translation',
          content: nodeContent,
          contentDigest: createContentDigest(translation),
        },
      };

      const nodeTranslation = Object.assign({}, translation, nodeMeta);
      createNode(nodeTranslation);
    }
  }
};
