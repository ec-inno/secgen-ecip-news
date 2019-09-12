module.exports = {
  name: 'clean',
  run: async toolbox => {
    const {
      print: { info, error },
      system: { run },
    } = toolbox;

    info('Cleaning previously saved data from Drupal JSONAPI ...');

    const dir = `${__dirname}/drupal_jsonapi`;

    try {
      await run(`rm -rf ${dir}`);
    } catch (e) {
      error(`Failed to delete ${dir}`, e.message);
    }
  },
};
