const app = require('./app')
const StateEngine = require('./state-engine')

StateEngine.store.subscribe(() => {
  // TODO: run window selectors and dispatch state update ?
})

function activateWindow () {
  // check window manager for windows
  if (StateEngine.selectors.findEditorWindows().length === 0) {
    StateEngine.actions.createEditor()
  }
}

app.on('ready', activateWindow)
app.on('activate', activateWindow)
