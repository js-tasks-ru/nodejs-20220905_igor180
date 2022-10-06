const url = require('url');
const http = require('http');
const path = require('path');
const deleteFile = require('./deleteFile.js');

const server = new http.Server();

server.on('request', (req, res) => {
  res.setHeader( 'content-type', 'text/plain; charset=utf-8' );

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  if (pathname.includes('/')){
    res.statusCode = 400;
    res.end('ошибка запроса');
    return;
  };

  switch (req.method) {
    case 'DELETE':

      deleteFile(filepath, res);
      
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
