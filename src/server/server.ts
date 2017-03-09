import * as http from 'http';
import * as fs from 'fs';
import nop = require('../../dist/common/nop');

const debug = require('debug')('my-server');

const PORT: number = 3000;

// Create a server and the handler for a few requests
const http_server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  debug('req.url=%s res=%s', req.url, res);
  switch (req.url) {
    case '/': {
      // Use a routine from common
      nop();

      // Write the header
      res.writeHead(200, {
        'content-type': 'text/html',
        'charset': 'UTF-8'
      });

      // Send index.html as the content
      fs.createReadStream('./public/index.html').pipe(res)
      break;
    }
    case '/build/bundle.js': {
      // Write the header
      res.writeHead(200, {
        'content-type': 'text/javascript',
        'charset': 'UTF-8'
      });

      // Send bundle.js as the content
      fs.createReadStream('./build/bundle.js').pipe(res)
      break;
    }
    default: {
      debug('default: req.url=' + req.url);

      // Not found send a 404 header
      res.writeHead(404, {
        'content-type': 'text/html',
        'charset': 'UTF-8'
      });

      // And the content is the url
      res.end('bad req.url=' + req.url);
      break;
    }
  }
});

// Start it listening on the desired port
http_server.listen(PORT, () => {
  debug('Listening on: http://localhost:%s', PORT);
});
