const test = require('tape')
const Browser = require('../index')
const path = require('path')

test('the textContent is extracted', assert => {
  const ps = Browser(path.join(__dirname, 'browser.js'))

  ps.on('stdout', (data) => {
    assert.equal(data, 'Hello')
  })
  ps.on('exit', (code, sig) => {
    assert.end()
  })
})

