const { combineReducers } = require('redux')
const { handleActions } = require('redux-actions')

const actions = require('./actions')
const identity = (defaultState) => (state = defaultState) => state

const reduceWindow = combineReducers({
  id: identity(null),
  electronId: handleActions({
    [actions.windowCreated.toString()]: (state, action) => action.payload.electronId,
  }, null),
  bundle: identity(null),
  state: handleActions({
    [actions.windowCreated.toString()]: () => 'READY',
    [actions.windowClosed.toString()]: () => 'CLOSED',
  }, null),
})

const reduceWindowList = handleActions({
  [actions.createWindow.toString()]: (state, { payload }) => {
    return Object.assign({
      [payload.id]: {
        id: payload.id,
        bundle: payload.bundle,
        state: 'REQUESTED',
      },
    }, state)
  },
}, {})

function reduceWindows (state, action) {
  const newState = Object.assign({}, reduceWindowList(state, action))
  const target = action.payload && action.payload.targetWindow

  if (target) {
    newState[target] = reduceWindow(newState[target], action)
  }

  return newState
}

module.exports = {
  windows: reduceWindows,
}
