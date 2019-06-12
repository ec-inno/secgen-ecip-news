const axios = require('axios');
const _ = require('lodash');

const nodeFromData = require('./lib/nodeFromData');
const addNodeTranslations = require('./lib/addNodeTranslations');

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest, reporter },
  { apiBase, baseUrl, basicAuth, filters, headers, languages, params }
) => {
  const { createNode } = actions;

  // Set defaults for some options.
  apiBase = apiBase || 'jsonapi';
  languages = languages || [];

  const nodes = [];

  reporter.info('Starting to fetch data from Drupal');

  for (const language of languages) {
    const endpoint = `${baseUrl}/${language}/${apiBase}`;

    const data = await axios.get(endpoint, {
      auth: basicAuth,
      headers,
      params,
    });

    const allData = await Promise.all(
      _.map(data.data.links, async (url, type) => {
        const defaultEndpoint = `${baseUrl}/${apiBase}`;
        const languageEndpoint = `${baseUrl}/${language}/${apiBase}`;

        // Correct links
        if (url && url.href && language) {
          url.href = url.href.replace(defaultEndpoint, languageEndpoint);
        }

        if (type === `self`) return;
        if (!url) return;
        if (!type) return;

        const getNext = async (url, data = []) => {
          if (typeof url === `object`) {
            // url can be string or object containing href field
            url = url.href;

            // Apply any filters configured in gatsby-config.js. Filters
            // can be any valid JSON API filter query string.
            // See https://www.drupal.org/docs/8/modules/jsonapi/filtering
            if (typeof filters === `object`) {
              if (filters.hasOwnProperty(type)) {
                url = url + `?${filters[type]}`;
              }
            }
          }

          let d;

          try {
            d = await axios.get(url, {
              auth: basicAuth,
              headers,
              params,
            });
          } catch (error) {
            if (error.response && error.response.status == 405) {
              // The endpoint doesn't support the GET method, so just skip it.
              return [];
            } else {
              console.error(`Failed to fetch ${url}`, error.message);
              console.log(error.data);
              throw error;
            }
          }

          data = data.concat(d.data.data);

          if (d.data.links.next) {
            data = await getNext(d.data.links.next, data);
          }

          return data;
        };

        const data = await getNext(url);

        const result = {
          type,
          data,
        };

        return result;
      })
    );

    // Make list of all IDs so we can check against that when creating
    // relationships.
    const ids = {};
    _.each(allData, contentType => {
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

    _.each(allData, contentType => {
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

    _.each(allData, contentType => {
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

  // Create each node
  for (const node of nodes) {
    createNode(node);
  }
};
