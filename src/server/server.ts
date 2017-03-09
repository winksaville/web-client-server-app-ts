import * as http from 'http';
import * as fs from 'fs';

const debug = require('debug')('my-server');

const PORT: number = 3000;

// Create a server and the handler for a few requests
const http_server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  debug('req.url=%s res=%s', req.url, res);
  switch (req.url) {
    case '/': {
      res.writeHead(200, {
        'content-type': 'text/html',
        'charset': 'UTF-8'
      });

      fs.createReadStream('./public/index.html').pipe(res)
      break;
    }
    case '/build/bundle.js': {
      res.writeHead(200, {
        'content-type': 'text/javascript',
        'charset': 'UTF-8'
      });

      fs.createReadStream('./build/bundle.js').pipe(res)
      break;
    }
    default: {
      debug('default: req.url=' + req.url);
      res.writeHead(404, {
        'content-type': 'text/html',
        'charset': 'UTF-8'
      });

      res.end('bad req.url=' + req.url);
      break;
    }
  }
});

// Start it listening on the desired port
http_server.listen(PORT, () => {
  debug('Listening on: http://localhost:%s', PORT);
});
