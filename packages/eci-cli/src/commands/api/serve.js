module.exports = {
  name: 'serve',
  run: toolbox => {
    const {
      print: { info, error },
    } = toolbox;

    const {
      GATSBY_DRUPAL_API_OFFLINE: localhost,
      DRUPAL_JSONAPI_OFFLINE_FOLDER: folder,
    } = process.env;
    const [protocol, hostname, port] = localhost.split(':');
    const http = require('http');

    if (!localhost || !folder) {
      error('Missing required environment variable.');
    }

    if (!hostname.includes('localhost')) {
      error(
        'Required pattern for GATSBY_DRUPAL_API_OFFLINE: http://localhost:3000'
      );
    }

    const server = http.createServer((req, res) => {
      info(`${req.method} ${req.url}`);

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;

      try {
        const data = require(`${folder}/${req.url}/data.json`);
        res.end(JSON.stringify(data));
      } catch (e) {
        error(`No data to mirror ${req.url}`);
        res.end('');
      }
    });

    server.listen(Number(port), () =>
      info(`Server running at ${protocol}:${hostname}:${port}`)
    );
  },
};
