const test = require('tape')
const Chrome = require('../index')
const path = require('path')
const fs = require('fs')

test('the textContent is extracted', assert => {
  const location = path.join(__dirname, 'browser0.js')

  const chrome = Chrome(fs.readFileSync(location, 'utf8'))
  chrome.on('stdout', data => {
    assert.equal(data, 'Hello')
    assert.end()
  })
})

test('the textContent is extracted using non default html', assert => {
  const js = path.join(__dirname, 'browser1.js')
  const html = path.join(__dirname, 'alternate-index.html')

  const chrome = Chrome({ js, html })
  chrome.on('stdout', (data) => {
    assert.equal(data, 'OK')
    assert.end()
  })
})
