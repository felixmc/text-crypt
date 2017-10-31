const { combineReducers } = require('redux')
const { handleActions } = require('redux-actions')

const actions = require('./actions')

const reduceWindow = combineReducers({
  id: handleActions({

  }, null),
  type: handleActions({

  }, null),
})

const reduceWindowList = handleActions({
  [actions.windowCreated.toString()]: (state, { payload }) => {
    return state.concat({ id: payload.id, type: payload.type })
  }
}, [])

function reduceWindows (state, action) {
  const newState = reduceWindowList(state, action).slice()
  const target = action.targetWindow

  if (target) {
    // newState[target] = reduceWindow(newState[target], action)
  }

  return newState
}

module.exports = {
  windows: reduceWindows,
}
