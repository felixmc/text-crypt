const { createActions } = require('redux-actions')
const WindowManager = require('../window-manager')

const actions = {
  CREATE_BLANK_EDITOR: () => {
    const win = WindowManager.createWindow('editor', { width: 900, height: 750, titleBarStyle: 'hidden' })
    return win.id
  },
}

module.exports = createActions(actions)
