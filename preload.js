
window.alert = () => {}

(function () {
  const fs = require('fs')
  const {
    remote,
    ipcRenderer: ipc
  } = require('electron')

  function rebind () {
    const log = console.log
    const error = console.error

    console.log = (...args) => {
      ipc.send('stdout', ...args)
      log(...args)
    }

    console.error = (...args) => {
      ipc.send('stderr', ...args)
      error(...args)
    }

    window.onerror = (...args) => {
      console.error(args[4].stack)
      window.close()
    }
  }

  const js = remote.getGlobal('js')
  fs.stat(js, err => {
    if (err) {
      return process.send(err.stack)
    }
    rebind()
    require(js)
  })
}())

