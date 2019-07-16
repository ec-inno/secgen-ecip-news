const createTranslationNode = ({
  node,
  createNodeId,
  createContentDigest,
  createNode,
}) => {
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
};

module.exports = createTranslationNode;
