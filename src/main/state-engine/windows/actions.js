const { createActions } = require('redux-actions')

const actions = ['CREATE_WINDOW', 'WINDOW_CREATED', 'WINDOW_CLOSED']
// {
//   CREATE_WINDOW: () => {
//     // FIXME: get window options from outside
//     // TODO: move this to a saga? and trigger a lower level CREATE_WINDOW action
//     const win = WindowManager.createWindow('editor', { width: 900, height: 750, titleBarStyle: 'hidden' })
//     return win.id
//   },
// }

module.exports = createActions.apply(null, actions)
