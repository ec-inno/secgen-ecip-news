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

  if (req.url === '/get/all') {
    /* eslint-disable-next-line  */
    const initiatives = require(`${apiFolder}/${apiFile}`);

    const response = { initiatives };
    return res.end(JSON.stringify(response));
  }

  return res.end('Unsupported endpoint');
});

server.on('request', () => console.log('Initiatives API offline: new request'));

server.listen(port, hostname, () => {
  console.log(`Local initiatives at http://${hostname}:${port}/`);
});
