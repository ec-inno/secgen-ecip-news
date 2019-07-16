const _ = require('lodash');
const nodeFromData = require('./nodeFromData');

const getNodes = ({
  allResources,
  apiBase,
  language,
  createNodeId,
  createContentDigest,
}) => {
  const nodes = [];

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
      const node = nodeFromData(datum, createNodeId, apiLanguageBasedNamespace);

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

  return nodes;
};

module.exports = getNodes;
