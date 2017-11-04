const { combineReducers } = require('redux')
const { handleActions } = require('redux-actions')

const actions = require('./actions')
const identity = (defaultState) => (state = defaultState) => state

const reduceBuffer = combineReducers({
  id: identity(null),
  isSaved: identity(null),
  filePath: handleActions({

  }, null),
  data: handleActions({
    [actions.bufferCreated.toString()]: (state, { payload }) => payload.data,
  }, null),
  state: handleActions({
    // [actions.bufferAllocated.toString()]: () => 'ALLOCATED',
    [actions.bufferCreated.toString()]: () => { console.log('>>>> Buffer Created'); return 'READY' },
  }, null),
})

const reduceBufferList = handleActions({
  [actions.createBuffer.toString()]: (state, { payload }) => {
    return Object.assign({
      [payload.id]: {
        id: payload.id,
        state: 'REQUESTED',
        windowId: payload.windowId,
      },
    }, state)
  },
}, {})

function reduceBuffers (state, action) {
  const newState = Object.assign({}, reduceBufferList(state, action))
  const target = action.payload && action.payload.targetBuffer

  if (target) {
    newState[target] = reduceBuffer(newState[target], action)
  }

  return newState
}

module.exports = {
  buffers: reduceBuffers,
}
