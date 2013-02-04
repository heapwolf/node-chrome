
var spawn = require('child_process').spawn;
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

module.exports = function(opts, callback) {

  var args = [

    '--app=http://localhost:' + (opts.port || 8080) + opts.index,
    '--force-app-mode',
    '--app-window-size=' + (opts.width || 1024) + ',' + (opts.height || 760),
    '--enable-crxless-web-apps',
    '--user-data-dir=' + __dirname
  ];

  var chrome;

  var httpserver = http.createServer(function (req, res) {

    var rawurl = url.parse(req.url);
    var pathname = decodeURI(rawurl.pathname);
    var base = path.join(process.cwd(), opts.files);
    var filepath = path.normalize(path.join(base, pathname));

    var p = path.extname(filepath).slice(1);
    var mimetype = mime.lookup(p);

    if (!mimetype) {
      return;
    }

    res.writeHeader('Content-Type', mimetype);

    fs.stat(filepath, function (err, stat) {

      if (err && err.code === 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'plain/text' });
          res.end('not found');
      }
      else {

        if (!stat.isDirectory()) {
          res.writeHead(200, { 'Content-Type': mimetype });
          fs.createReadStream(filepath).pipe(res);
        }
      }
    });
  });

  httpserver.listen(opts.port, function() {
    
    chrome = spawn(opts.runtime, args);

    var WebSocketServer = require('ws').Server;
    var wss = new WebSocketServer({ server: httpserver });

    wss.on('connection', function(ws) {

      callback.call(this, ws, chrome);
    });
  });
};
