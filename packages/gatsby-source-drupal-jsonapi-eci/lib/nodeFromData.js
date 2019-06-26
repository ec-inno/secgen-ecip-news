const nodeFromData = (datum, createNodeId, apiLanguageBasedNamespace) => {
  const { attributes: { id: _attributes_id, ...attributes } = {} } = datum;
  const preservedId =
    typeof _attributes_id !== `undefined` ? { _attributes_id } : {};
  return {
    id: apiLanguageBasedNamespace + '/' + createNodeId(datum.id),
    drupal_id: datum.id,
    parent: null,
    children: [],
    ...attributes,
    ...preservedId,
    internal: {
      type: datum.type.replace(/-|__|:|\.|\s/g, `_`),
    },
  };
};

module.exports = nodeFromData;
