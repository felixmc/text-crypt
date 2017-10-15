const {Menu, app, shell, dialog, remote, BrowserWindow} = require('electron')
const defaultMenu = require('electron-default-menu')

const menu = defaultMenu(app, shell)

menu.splice(1, 0, {
  label: 'File',
  submenu: [
    {
      label: 'Open',
      accelerator: 'CommandOrControl+O',
      click: () => BrowserWindow.getFocusedWindow().webContents.send('file-open', dialog.showOpenDialog({
        defaultPath: process.cwd(),
        properties: ['openFile'],
        filters: [{ name: 'TextCrypt Files', extensions: ['txc'] }],
      })),
    },
    {
      label: 'Save',
      accelerator: 'CommandOrControl+S',
      click: () => BrowserWindow.getFocusedWindow().webContents.send('file-save'),
    },
  ],
})

module.exports = Menu.buildFromTemplate(menu)
