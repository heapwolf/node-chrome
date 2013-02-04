
# NAME
node-chrome(3)

# SYNOPSIS
Make apps with Node.js and Chrome

# DESCRIPTION
Use chrome to make desktop apps in node.js

# EXAMPLES
There are two ways you can do this. Use an existing chrome executable or bundle
a version of it. If you bundle a version of it, you can be sure it works on the
target platform, as well as your own icon.

```js
#!/usr/bin/env node

var cn = require('../lib');

var opts = {
  runtime: "/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome",
  files: "../ui",
  port: 8080,
  index: "/index.html",
  width: 1024,
  height: 760
};

cn(opts, function(websocket, chrome) {

  websocket.on('message', function(message) {
    console.log(message);
  });

  chrome.stdout.on('data', function (data) {

  });

  chrome.stderr.on('data', function (data) {

  });

  chrome.on('exit', function (code) {
    process.exit(0);
  });
});
```
