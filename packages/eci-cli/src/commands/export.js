const XLSX = require('xlsx');

module.exports = {
  name: 'export',
  alias: ['e'],
  run: async toolbox => {
    const {
      filesystem: { path, inspectTree, read },
      print: { info },
    } = toolbox;

    info('Exporting all translations ...');

    const wb = XLSX.utils.book_new();
    const tree = inspectTree(path('translations'));
    const components = tree.children.filter(child => child.type === 'dir');

    components.forEach(component => {
      const rows = [];
      const componentTranslations = component.children;

      componentTranslations.forEach(translationsFile => {
        const [langcode] = translationsFile.name.split('.');

        const translationsData = read(
          path(`translations/${component.name}/${translationsFile.name}`),
          'json'
        );

        Object.keys(translationsData).forEach(key => {
          const indexExisting = rows.findIndex(row => row.key === key);

          // Add if not present.
          if (indexExisting === -1) {
            rows.push({
              key,
              [langcode]: translationsData[key],
            });
          }
          // Update otherwise.
          else {
            const row = rows.splice(indexExisting, 1)[0];
            row[langcode] = translationsData[key];

            rows.push(row);
          }
        });
      });

      const ws = XLSX.utils.json_to_sheet(rows);

      XLSX.utils.book_append_sheet(wb, ws, component.name);
    });

    XLSX.writeFile(wb, 'translations.xls');

    info('Translations have been exported');
  },
};
