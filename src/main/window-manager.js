const {BrowserWindow} = require('electron')

const path = require('path')
const url = require('url')

const buildDir = path.join(__dirname, '../../build')

function composeBundle (entry) {
  return url.format({
    pathname: path.join(buildDir, 'renderer/index.html'),
    hash: entry,
    protocol: 'file:',
    slashes: true,
  })
}

const windows = {}
function createWindow (type, options) {
  const win = new BrowserWindow(options)
  windows[win.id] = {
    type,
    instance: win,
  }
  win.loadURL(composeBundle(type))
  win.on('closed', () => {
    delete windows[win.id]
  })

  return win
}

function findByType (type) {
  return Object.keys(windows)
    .filter(win => win.type === type)
    .map(win => win.instance)
}

const WindowManager = {
  createWindow,
  findByType,
}

module.exports = WindowManager
