# SYNOPSIS
Run chrome headlessly as a module or as a command from the commandline.

# USAGE

```bash
./node-chrome index.js index.html
```

```js
const Chrome = require('node-chrome')
const path = require('path')

const js = path.join(__dirname, 'index.js')
const html = path.join(__dirname, 'index.html')

const ps = Chrome(js, html)
ps.on('stdout', (data) => console.log(data))
ps.on('exit', (code, sig) => process.exit(code, sig))
```

