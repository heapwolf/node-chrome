const electron = require('electron')
const ipc = electron.ipcMain

const preload = process.argv[2]
const javascript = process.argv[3]
const html = process.argv[4]

global.source = javascript

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
    webPreferences: { preload, nodeIntegration: false }
  })

  w.loadURL('file://' + html)
})
