
// preload is invoked in a closure, its not global, so no iife required.
window.alert = () => {}
const log = console.log
const error = console.error

const fs = require('fs')
const { remote, ipcRenderer: ipc } = require('electron')
const s = remote.getGlobal('s')
const js = remote.getGlobal('js')

console.log = (...args) => {
  ipc.send('stdout', ...args)
  log(...args)
}

console.error = (...args) => {
  ipc.send('stderr', ...args)
  error(...args)
}

const die = (...args) => {
  console.error(...args)
  window.close()
}

window.onerror = (...args) => die(args[4].stack)

if (js) {
  fs.stat(js, err => {
    if (err) return die(err.stack)
    require(js)
  })
}

if (s) {
  eval(s)
}

