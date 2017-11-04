const { combineReducers } = require('redux')
const { handleActions } = require('redux-actions')

const actions = require('./actions')
const identity = (defaultState) => (state = defaultState) => state

const reduceEditor = combineReducers({
  id: identity(null),
  windowId: handleActions({
    [actions.editorAllocated.toString()]: (state, { payload }) => payload.windowId,
  }, null),
  bufferId: handleActions({
    [actions.editorAllocated.toString()]: (state, { payload }) => payload.bufferId,
  }, null),
  state: handleActions({
    [actions.editorAllocated.toString()]: () => 'ALLOCATED',
    [actions.editorReady.toString()]: () => 'READY',
  }, null),
})

const reduceEditorList = handleActions({
  [actions.createEditor.toString()]: (state, { payload }) => {
    return Object.assign({
      [payload.id]: {
        id: payload.id,
        state: 'REQUESTED',
      },
    }, state)
  },
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
