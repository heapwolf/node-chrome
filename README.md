# SYNOPSIS
Run chrome headlessly as a module or as a command from the commandline. This
project was inspired by [electron-stream](https://github.com/juliangruber/electron-stream),
it's similar but doesnt require node streams or any servers.

# USAGE

## FROM THE COMMANDLINE
```bash
node-chrome index.js index.html
```

## AS A MODULE
```js
const chrome = require('node-chrome')
const path = require('path')

const js = path.join(__dirname, 'index.js')
const html = path.join(__dirname, 'index.html')

const chrome = chrome(js, html)
chrome.on('stdout', (data) => console.log(data))
chrome.on('exit', (code, sig) => process.exit(code, sig))
```

