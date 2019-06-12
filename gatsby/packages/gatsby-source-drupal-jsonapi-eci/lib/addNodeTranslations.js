const addNodeTranslations = nodes =>
  nodes.map(node => {
    const translations = [];

    nodes.forEach(rel => {
      const isSameResource = rel.id === node.id;
      const isSameResourceDrupal = rel.drupal_id === node.drupal_id;
      const isTranslation = rel.default_langcode === false;

      if (!isSameResource && isSameResourceDrupal) {
        // Regular Drupal way to flag something as a translation.
        if (isTranslation) {
          translations.push(rel);
        }
        // Untranslated nodes are inheriting path alias information.
        // Even when they are marked as default_langcode and all the rest, they are not actual translations.
        if (
          rel.content_translation_source === 'und' &&
          rel.default_langcode &&
          rel.path &&
          node.path &&
          node.path.langcode &&
          rel.path.langcode !== node.path.langcode
        ) {
          translations.push(rel);
        }
      }
    });

    node.translations = translations;

    return node;
  });

module.exports = addNodeTranslations;
