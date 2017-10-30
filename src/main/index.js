const app = require('./app')

const WindowManager = require('./window-manager')
const StateEngine = require('./state-engine')

StateEngine.store.subscribe(() => {
  console.log('State Changed!')
})

const WINDOWS = { EDITOR: 'editor' }

function activateWindow () {
  // check window manager for windows
  if (WindowManager.findByType(WINDOWS.EDITOR).length === 0) {
    StateEngine.actions.createBlankEditor()
  }
}

app.on('ready', activateWindow)
app.on('activate', activateWindow)
