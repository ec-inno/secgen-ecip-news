/**
 * Gets a list of nodes {id, path: { langcode } }
 * Returns an object with organized nodes per-language.
 *
 * @param {String} languageDefault
 * @param {Array<Object>} nodesList
 * @returns {Object}
 */
const getNodesPerLanguage = (nodesList, languageDefault) => {
  if (!nodesList || !languageDefault) return {};

  const nodesPerLanguage = {};

  nodesList.forEach(({ node }) => {
    const { id, path } = node;
    const { langcode } = path;

    const langcodeId = id.split('/')[1];

    if (
      (langcode === languageDefault && langcodeId === languageDefault) ||
      langcode === langcodeId
    ) {
      if (!nodesPerLanguage[langcode]) {
        nodesPerLanguage[langcode] = [];
      }

      const nodeExists = nodesPerLanguage[langcode].find(
        n => n.id === id && n.path.langcode === langcode
      );

      if (!nodeExists) nodesPerLanguage[langcode].push(node);
    }
  });

  return nodesPerLanguage;
};

module.exports = getNodesPerLanguage;
