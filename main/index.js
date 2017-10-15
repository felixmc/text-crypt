const path = require('path')
const url = require('url')

const bundle = (entry) => url.format({
  pathname: '//127.0.0.1:27978/',
  hash: entry,
  protocol: 'http:',
  slashes: true,
})

const {BrowserWindow, Menu, app, ipcMain} = require('electron')
require('electron-debug')({ showDevTools: true })

// const electronLocalshortcut = require('electron-localshortcut')

const menu = require('./menu')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function onAppReady () {
  Menu.setApplicationMenu(menu)

  mainWindow = new BrowserWindow({width: 900, height: 750, titleBarStyle: 'hidden'})

  mainWindow.webContents.session.clearCache(console.log)

  mainWindow.loadURL(bundle('editor'))

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', onAppReady)

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    onAppReady()
  }
})
