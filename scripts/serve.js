const http = require('http');
const url = require('url');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;

  // Ignore query strings.
  const resource = url.parse(req.url).pathname;

  try {
    const data = require(`../drupal_jsonapi/${resource}/data.json`);
    res.end(JSON.stringify(data));
  } catch (error) {
    res.end('');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
