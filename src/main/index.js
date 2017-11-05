const {Menu, app} = require('electron')
require('electron-debug')({ showDevTools: true })

const initIpc = require('./ipc-dispatcher')
const StateEngine = require('./state-engine')
const menu = require('./menu')(StateEngine)
initIpc(StateEngine)

function activateWindow () {
  // check window manager for windows
  if (StateEngine.selectors.findEditorWindows().length === 0) {
    StateEngine.actions.createEditor()
  }
}

app.on('activate', activateWindow)
app.on('ready', () => {
  Menu.setApplicationMenu(menu)
  activateWindow()
})

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
