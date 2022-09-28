const http = require('http');
const path = require('path');
const OneMB_file_saver = require('./1MB_file_saver');

const server = new http.Server();

server.on('request', (req, res) => {
  res.setHeader( 'content-type', 'text/plain; charset=utf-8' );

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);

  if (pathname.includes('/')){
    res.statusCode = 400;
    res.end('ошибка запроса');
    return;
  };

  
  const filepath = path.join(__dirname, 'files', pathname);

  

  switch (req.method) {
        case 'POST':
    
          OneMB_file_saver(filepath, req, res);
    
          break;
    
        default:
          res.statusCode = 501;
          res.end('Not implemented');
  } //switch

  
});

module.exports = server;
