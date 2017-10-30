const { createActions } = require('redux-actions')
const WindowManager = require('../../window-manager')

const actions = {
  CREATE_BLANK_EDITOR: () => {
    // FIXME: get window options from outside
    // TODO: move this to a saga? and trigger a lower level CREATE_WINDOW action
    const win = WindowManager.createWindow('editor', { width: 900, height: 750, titleBarStyle: 'hidden' })
    return win.id
  },
}

module.exports = createActions(actions)
