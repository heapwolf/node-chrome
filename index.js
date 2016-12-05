const electron = require('electron')
const child = require('child_process')
const ipc = electron.ipcMain
const path = require('path')
const events = require('events')

const stdio = [null, null, null, 'ipc']

const args = [
  path.join(__dirname, 'index.js'),
  'instance',
  process.argv[2] && path.join(process.cwd(), process.argv[2]),
  process.argv[3] && path.join(process.cwd(), process.argv[3])
]

let win
global.js = process.argv[3]

function spawnChild () {
  return child.spawn(electron, args, { stdio })
}

function createWindow () {
  const w = new electron.BrowserWindow({
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false
    }
  })

  const fallback = path.join(__dirname, 'index.html')
  w.loadURL('file://' + process.argv[3] || fallback)
  return w
}

function main () {
  if (process.argv[2] !== 'instance') {
    if (module.parent) {
      module.exports = (js, html) => {
        args[2] = js
        args[3] = html

        const ee = new events.EventEmitter()
        const ps = spawnChild()

        ps.on('message', msg => ee.emit(msg.event, msg.output))
        ps.on('exit', (code, sig) => ee.emit('exit', code, sig))
        return ee
      }
      return 0
    }

    const ps = spawnChild()

    ps.on('message', msg => process[msg.event].write(msg.output + '\n'))
    ps.on('exit', (code, sig) => {
      win = null
      process.exit(code, sig)
    })
    return 0
  }

  electron.app.dock.hide()
  electron.app.on('ready', () => {
    ipc.on('stdout', (event, output) => {
      process.send({ event: 'stdout', output })
    })

    ipc.on('stderr', (event, output) => {
      process.send({ event: 'stderr', output })
    })
    win = createWindow()
  })
}

main()

