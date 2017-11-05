// const { createSelector } = require('reselect')

function getWindowList (state) {
  return Object.keys(state.windows).map(id => state.windows[id])
}

function findWindowByType (state, bundle) {
  return getWindowList(state)
    .filter(win => win.bundle === bundle && win.state !== 'CLOSED')
    .map(win => win.id)
}

exports.getActiveWindows = function getActivWindows (state) {
  return getWindowList(state)
    .filter(win => win.state === 'READY')
}

exports.findEditorWindows = function findEditorWindows (state) {
  return findWindowByType(state, 'editor')
}
