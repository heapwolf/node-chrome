const test = require('tape')
const Chrome = require('../index')
const path = require('path')

test('the textContent is extracted', assert => {
  const javascript = path.join(__dirname, 'browser0.js')

  const chrome = Chrome(javascript)
  chrome.on('stdout', (data) => {
    assert.equal(data, 'Hello')
    assert.end()
  })
})

test('the textContent is extracted using non default html', assert => {
  const javascript = path.join(__dirname, 'browser1.js')
  const html = path.join(__dirname, 'alternate-index.html')

  const chrome = Chrome(javascript, html)
  chrome.on('stdout', (data) => {
    assert.equal(data, 'OK')
    assert.end()
  })
})
