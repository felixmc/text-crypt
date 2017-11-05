const {BrowserWindow} = require('electron')

const path = require('path')
const url = require('url')

const buildDir = path.join(__dirname, '../../../../build')

function composeWindowBundle (id) {
  return url.format({
    pathname: path.join(buildDir, 'renderer/index.html'),
    hash: id,
    protocol: 'file:',
    slashes: true,
  })
}

exports.makeWindow = function makeWindow (type, options) {
  const win = new BrowserWindow(options)
  win.loadURL(composeWindowBundle(type))
  return win
}

exports.getWindow = function getWindow (id) {
  return BrowserWindow.fromId(id)
}
