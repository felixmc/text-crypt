// const { createSelector } = require('reselect')

function findWindowByType (windows, bundle) {
  return Object.keys(windows).map(id => windows[id])
    .filter(win => win.bundle === bundle && win.state !== 'CLOSED')
    .map(win => win.id)
}

exports.findEditorWindows = function findEditorWindows (state) {
  return findWindowByType(state.windows, 'editor')
}
