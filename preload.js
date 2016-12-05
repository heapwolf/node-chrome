
// preload is invoked in a closure, its not global, so no iife required.
window.alert = () => {}
const log = console.log
const error = console.error

const fs = require('fs')
const { remote, ipcRenderer: ipc } = require('electron')
const source = remote.getGlobal('source')

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

fs.stat(source, err => {
  if (err) return die(err.stack)
  require(source)
})
