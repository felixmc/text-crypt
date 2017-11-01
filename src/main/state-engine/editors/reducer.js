const { combineReducers } = require('redux')
const { handleActions } = require('redux-actions')

const actions = require('./actions')
const identity = (defaultState) => (state = defaultState) => state

const reduceEditor = combineReducers({
  id: identity(null),
  windowId: identity(null),
  bufferId: handleActions({

  }, null),
  state: handleActions({

  }, null),
})

const reduceEditorList = handleActions({
  [actions.editorCreated.toString()]: (state, { payload }) => {
    return Object.assign({
      [payload.id]: {
        id: payload.id,
        state: 'READY',
        windowId: payload.windowId,
      },
    }, state)
  }
}, {})

function reduceEditors (state, action) {
  const newState = Object.assign({}, reduceEditorList(state, action))
  const target = action.payload && action.payload.targetEditor

  if (target) {
    newState[target] = reduceEditor(newState[target], action)
  }

  return newState
}

module.exports = {
  editors: reduceEditors,
}
