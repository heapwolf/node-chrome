const electron = require('electron')
const minimist = require('minimist')
const argv = minimist(process.argv.slice(2))
const ipc = electron.ipcMain

global.js = argv.js
global.s = argv.s

electron.app.dock.hide()
electron.app.on('ready', () => {
  ipc.on('stdout', (event, output) => {
    process.send({ event: 'stdout', output })
  })

  ipc.on('stderr', (event, output) => {
    process.send({ event: 'stderr', output })
  })

  const w = new electron.BrowserWindow({
    show: false,
    webPreferences: { preload: argv._[0], nodeIntegration: !!argv.node }
  })
  w.loadURL('file://' + (argv.html || __dirname + '/index.html'))
})
