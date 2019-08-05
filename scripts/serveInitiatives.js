/**
 * Minimal dependency-free server providing information about:
 *
 * - initiatives list
 * - single initiative details
 *
 * Not meant to be used in production, it's only to facilitate local offline development!
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const port = 4000;
const hostname = 'localhost';
const apiFolder = path.resolve(__dirname, '../api');
const apiFile = 'initiatives.json';

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (!fs.existsSync(`${apiFolder}/${apiFile}`)) {
    return res.end(
      'Missing file with initiatives. You might want to run the script to get them locally first.'
    );
  }

  // Require the json instead of reading it as a buffer.
  /* eslint-disable-next-line  */
  const initiatives = require(`${apiFolder}/${apiFile}`);

  // Simulates GET https://ec.europa.eu/citizens-initiative/services/initiative/get/all
  if (req.url === '/get/all') {
    const response = { initiative: initiatives };
    return res.end(JSON.stringify(response));
  }

  // Simulates GET http://ec.europa.eu/citizens-initiative/services/initiative/details/2019/000010
  if (req.url.includes('/details')) {
    const q = req.url.split('/').filter(a => a);
    const [_, year, number] = q;
    const details = initiatives.find(
      initiative => initiative.year === year && initiative.number === number
    );

    return res.end(JSON.stringify(details));
  }

  return res.end('Unsupported endpoint');
});

server.on('request', req =>
  console.log(`Initiatives API offline: ${req.method} ${req.url}`)
);

server.listen(port, hostname, () => {
  console.log(`Local initiatives at http://${hostname}:${port}/`);
});
