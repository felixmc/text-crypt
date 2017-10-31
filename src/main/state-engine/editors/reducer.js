const { combineReducers } = require('redux')
const { handleActions } = require('redux-actions')

const actions = require('./actions')

const reduceEditor = combineReducers({
  id: handleActions({

  }, null),
  windowId: handleActions({

  }, null),
  bufferId: handleActions({

  }, null),
})

const reduceEditorList = handleActions({
  [actions.editorCreated.toString()]: (state, action) => {
    return state.concat(action.payload)
  }
}, [])

function reduceEditors (state, action) {
  const newState = reduceEditorList(state, action).slice()
  const target = action.targetEditor

  if (target) {
    // newState[target] = reduceEditor(newState[target], action)
  }

  return newState
}

module.exports = {
  editors: reduceEditors,
}
