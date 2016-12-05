# SYNOPSIS
Run chrome headlessly as a module or as a command from the commandline. This
project is similar to [electron-stream](https://github.com/juliangruber/electron-stream),
but it's simpler, no streams, no servers, etc.

# USAGE

## FROM THE COMMANDLINE
The `html` file is optional (an empty one will be used by default).

```bash
node-chrome index.js [index.html]
```

## AS A MODULE
Provides an event emitter with `stdout`, `stderr` and `exit`.

```js
const chrome = require('node-chrome')
const path = require('path')

const js = path.join(__dirname, 'index.js')
const html = path.join(__dirname, 'index.html')

const chrome = chrome(js, html) // html is optional

chrome.on('stdout', (data) => console.log(data))
chrome.on('exit', (code, sig) => process.exit(code, sig))
```

Kill an isntance with `kill`.

```js
chrome.kill(/* sig */)
```
