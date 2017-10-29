const {Menu, app} = require('electron')
require('electron-debug')({ showDevTools: true })

const menu = require('./menu')

app.on('ready', () => {
  Menu.setApplicationMenu(menu)
})

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

module.exports = app
