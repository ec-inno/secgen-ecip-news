const nodeFromData = (datum, createNodeId, apiLanguageBasedNamespace) => {
  const { attributes: { id: _attributes_id, ...attributes } = {} } = datum;
  const preservedId =
    typeof _attributes_id !== `undefined` ? { _attributes_id } : {};

  const node = {
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

  if (datum.type === 'menu') {
    node.menu_has_parent = attributes.parent ? true : false; // set false, otherwise null is automatic
  }

  return node;
};

module.exports = nodeFromData;
