const addNodeTranslations = nodes =>
  nodes.map(node => {
    const translations = [];

    nodes.forEach(rel => {
      // Both are nodes with paths.
      if (
        rel.path &&
        rel.path.langcode &&
        node.path &&
        node.path.langcode &&
        rel.path.langcode !== node.path.langcode
      ) {
        const isSameResource = rel.id === node.id;
        const isSameResourceDrupal = rel.drupal_id === node.drupal_id;

        if (!isSameResource && isSameResourceDrupal) {
          // Gatsby creates content mirroring Drupal paths directly.
          translations.push(rel.path);
        }
      }
    });

    node.translations = translations;

    return node;
  });

module.exports = addNodeTranslations;
