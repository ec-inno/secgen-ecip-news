module.exports = {
  name: 'export',
  alias: ['e'],
  run: async toolbox => {
    // @see https://infinitered.github.io/gluegun/#/guide-architecture?id=performance
    /* eslint-disable-next-line global-require */
    const XLSX = require('xlsx');
    // Temporary components which should be coming from Drupal
    const skip = ['footer', 'menu'];

    const {
      filesystem: { path, inspectTree, read, cwd },
      print: { info },
    } = toolbox;

    info('Exporting all translations ...');

    const wb = XLSX.utils.book_new();
    const tree = inspectTree(path('translations'));
    const components = tree.children
      .filter(child => child.type === 'dir')
      .filter(component => !skip.includes(component.name));

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

    info(`translations.xls is now ready at ${cwd()}`);
  },
};
