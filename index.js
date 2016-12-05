const electron = require('electron')
const child = require('child_process')
const events = require('events')
const path = require('path')

const parent = path.join(__dirname, 'bin/node-chrome')

module.exports = function (javascript, html) {
  const main = path.join(__dirname, 'main.js')
  const stdio = [null, null, null, 'ipc']
  const preload = path.join(__dirname, 'preload.js')

  const args = [main, preload, javascript, html]
  const sp = child.spawn(electron, args, { stdio })

  // running as bin script
  if (module.parent.filename === parent) {
    sp.on('message', msg => process[msg.event].write(msg.output + '\n'))
    sp.on('exit', (code, sig) => process.exit(code, sig))
  } else {
    // running as a module
    const ee = new events.EventEmitter()
    sp.on('message', msg => ee.emit(msg.event, msg.output))
    sp.on('exit', (code, sig) => ee.emit('exit', code, sig))
    ee.on('kill', (sig) => sp.kill(sp.pid, sig))
    return ee
  }
}
