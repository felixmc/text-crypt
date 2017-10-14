const {BrowserWindow, Menu, app, shell, ipcMain, dialog} = require('electron')
require('electron-debug')({ showDevTools: true })

const defaultMenu = require('electron-default-menu')
const electronLocalshortcut = require('electron-localshortcut')

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function onAppReady () {
  mainWindow = new BrowserWindow({width: 900, height: 750})

  const menu = defaultMenu(app, shell)
  menu.splice(1, 0, {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        accelerator: 'CommandOrControl+O',
        click: () => mainWindow.webContents.send('file-open', dialog.showOpenDialog({
          defaultPath: process.cwd(),
          properties: ['openFile'],
          filters: [{ name: 'TextCrypt Files', extensions: ['txc'] }],
        })),
      },
      {
        label: 'Save',
        accelerator: 'CommandOrControl+S',
        click: () => mainWindow.webContents.send('file-save'),
      },
    ],
  })
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu))

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

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
