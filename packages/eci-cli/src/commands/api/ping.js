module.exports = {
  name: 'ping',
  run: async toolbox => {
    const {
      http,
      print: { info, error },
    } = toolbox;

    const { SITE_BASE_URL: baseURL } = process.env;

    if (!baseURL) {
      return error('Cannot work without value for SITE_BASE_URL.');
    }

    const client = http.create({ baseURL });

    try {
      const result = await client.get('/en/api');
      info(result);
    } catch (e) {
      error(`An error occured while communicating with ${baseURL}`, e);
    }
  },
};
