# NAME
node-chrome(3)

# SYNOPSIS
Make apps with Node.js and Chrome

# DESCRIPTION
Use Chrome to make desktop apps in Node.js. Runs on platforms that Chrome and 
Node.js run on.

# EXAMPLES
The `runtime` can point to an existing Chrome binary. You could also bundle a copy 
of it with your project. Bundling it means you can change the icon and other such.
things.

```js
#!/usr/bin/env node

var nc = require('node-chrome');

var opts = {
  runtime: "/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome",
  files: "./ui",
  port: 8080,
  index: "/index.html",
  width: 1024,
  height: 760
};

nc(opts, function(websocket, chrome) {

  // output from the socket.
  websocket.on('message', function(message) {
    console.log(message);
  });

  // output from the chrome runtime.
  chrome.stdout.on('data', function (data) {
    console.log(data);
  });

  // when the user quits the app.
  chrome.on('exit', function (code) {
    process.exit(0);
  });
});
```
