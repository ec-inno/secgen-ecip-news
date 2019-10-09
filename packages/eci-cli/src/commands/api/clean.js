module.exports = {
  name: 'clean',
  run: async toolbox => {
    const {
      print: { info, error },
      parameters: { options },
      system: { run },
    } = toolbox;

    let folder =
      options.folder ||
      process.env.DRUPAL_JSONAPI_OFFLINE_FOLDER ||
      'api/drupal/jsonapi';

    const dir = folder.split('/')[0]; // only first segment is needed

    if (!dir) {
      info("Missing folder to delete. Can't do anything.");
      return;
    }

    info('Cleaning previously saved data from Drupal JSON:API ...');

    try {
      await run(`rm -rf ${dir}`);
    } catch (e) {
      error(`Failed to delete ${dir}`, e.message);
    }
  },
};
