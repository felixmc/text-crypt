const { combineReducers } = require('redux')
const { handleActions } = require('redux-actions')

function reduceBuffer (state, action) {

}

function reduceBuffers (state, action) {
  const newState = Object.assign({}, state)
  const target = action.targetBuffer

  if (target) {
    newState[target] = reduceBuffer(newState[target], action)
  }

  return newState
}

module.exports = {
  buffers: reduceBuffers,
}
