const {ipcMain, BrowserWindow} = require('electron')

module.exports = (StateEngine) => {
  // renderer main.js calls window-ready when it's ready to run the window's app code
  // so we tell it what app to run and mark the window as ready so it can receive state-syncs
  ipcMain.on('window-ready', (event, id) => {
    const state = StateEngine.store.getState()
    const win = state.windows[id]
    StateEngine.actions.windowReady({ targetWindow: id })
    event.returnValue = win
  })

  // mechanism by which we allow renderer processes to dispatch actions to StateEngine
  ipcMain.on('dispatch', (event, type, payload) => {
    // FIXME: maybe tighten up in future and whitelist actions by bundle and validate sender
    StateEngine.store.dispatch({ type, payload })
  })

  StateEngine.store.subscribe(function updateSubscribers () {
    const state = StateEngine.store.getState()
    const subs = state.subscribers

    Object.keys(subs).forEach(subId => {
      const sub = subs[subId]
      const win = state.windows[sub.windowId]
      if (win && win.state === 'READY') {
        // WIISHLIST TODO:
        // #1 memoize selector for this state so and use the cached result in future
        //    - problem: storing unencrypted data in cache..vulnerability?
        // #2 only push branches of state that have changes, aka a sort of rudimentary diff that only accounts for 1 layer deep
        //    - what if we do a window refresh? we'll need all state branches again..maybe add mechanism for refresh as well?
        const subState = StateEngine.selectors[sub.selector].apply(null, sub.args)
        BrowserWindow.fromId(win.electronId).webContents.send('state-sync', subState)
      }
    })
  })
}
