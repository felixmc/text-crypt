const { createStore, combineReducers, applyMiddleware } = require('redux')
const { default: createSagaMiddleware } = require('redux-saga')
const { createLogger } = require('redux-logger')

module.exports = function create (reducers, sagas) {
  const sagaMiddleware = createSagaMiddleware()
  const logger = createLogger({})

  const store = createStore(
    combineReducers(reducers),
    applyMiddleware(sagaMiddleware, logger)
  )

  for (const saga in sagas) {
    sagaMiddleware.run(saga)
  }

  return store
}
