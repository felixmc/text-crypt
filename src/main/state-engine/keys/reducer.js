// const { combineReducers } = require('redux')
// const { handleActions } = require('redux-actions')

function reduceKey (state, action) {

}

function reduceKeys (state, action) {
  const newState = Object.assign({}, state)
  const target = action.targetKey

  if (target) {
    newState[target] = reduceKey(newState[target], action)
  }

  return newState
}

module.exports = {
  keys: reduceKeys,
}
