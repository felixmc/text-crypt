const { combineReducers } = require('redux')
const { handleActions } = require('redux-actions')

function reduceEditor (state, action) {

}

function reduceEditors (state, action) {
  const newState = Object.assign({}, state)
  const target = action.targetEditor

  if (target) {
    newState[target] = reduceEditor(newState[target], action)
  }

  return newState
}

module.exports = {
  editors: reduceEditors,
}
