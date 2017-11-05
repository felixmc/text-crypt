const { combineReducers } = require('redux')
const { handleActions } = require('redux-actions')

const actions = require('./actions')
const identity = (defaultState) => (state = defaultState) => state

const reduceSubscriber = combineReducers({
  id: identity(null),
  windowId: identity(null),
  selector: identity(null),
  state: handleActions({
    [actions.subscriptionCreated.toString()]: () => 'READY',
    // [actions.windowClosed.toString()]: () => 'CLOSED',
  }, null),
  args: identity([]),
})

const reduceSubscriberList = handleActions({
  [actions.createSubscription.toString()]: (state, { payload }) => {
    return Object.assign({
      [payload.id]: {
        id: payload.id,
        windowId: payload.windowId,
        selector: payload.selector,
        args: payload.args,
        state: 'REQUESTED',
      },
    }, state)
  },
}, {})

function reduceSubscribers (state, action) {
  const newState = Object.assign({}, reduceSubscriberList(state, action))
  const target = action.payload && action.payload.targetSubscriber

  if (target) {
    newState[target] = reduceSubscriber(newState[target], action)
  }

  return newState
}

module.exports = {
  subscribers: reduceSubscribers,
}
