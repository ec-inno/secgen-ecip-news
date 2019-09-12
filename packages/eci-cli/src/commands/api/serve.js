module.exports = {
  name: 'serve',
  run: toolbox => {
    const {
      print: { info, error },
    } = toolbox;

    const { DRUPAL_BASE_URL_OFFLINE: localhost } = process.env;
    const [protocol, hostname, port] = localhost.split(':');
    // Load either http or https.
    const http = require('http');

    if (!localhost) {
      return error('Cannot work without value for DRUPAL_BASE_URL_OFFLINE.');
    }

    if (!hostname.includes('localhost')) {
      return error(
        'Required pattern for DRUPAL_BASE_URL_OFFLINE: http://localhost:3000'
      );
    }

    const server = http.createServer((req, res) => {
      info(`${req.method} ${req.url}`);

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;

      try {
        const data = require(`${__dirname}/drupal_jsonapi/${req.url}/data.json`);
        res.end(JSON.stringify(data));
      } catch (error) {
        res.end('');
      }
    });

    server.listen(Number(port), () =>
      info(`Server running at ${protocol}:${hostname}:${port}`)
    );
  },
};
