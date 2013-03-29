var spawn = require('child_process').spawn;

module.exports = function(httpserver, opts, callback) {
  var chrome;
  if (typeof opts === 'function' && typeof callback === 'undefined') {
    callback = opts;
    opts = {};
  }

  opts = opts || {};

  httpserver.listen(opts.port, function() {
    var args = [
      '--app=http://localhost:' + this.address().port + '/',
      '--force-app-mode',
      '--app-window-size=' + (opts.width || 1024) + ',' + (opts.height || 760),
      '--enable-crxless-web-apps',
      '--user-data-dir=' + __dirname
    ];
    chrome = spawn(opts.runtime, args);
    callback.call(this, chrome);
  });
};
