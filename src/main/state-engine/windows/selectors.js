// const { createSelector } = require('reselect')

function findWindowByType (windows, type) {
  return windows
    .filter(win => win.type === type)
    .map(win => win.instance)
}

exports.findEditorWindows = function findEditorWindows (state) {
  return findWindowByType(state.windows, 'editor')
}
