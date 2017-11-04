const { createStore, combineReducers, applyMiddleware } = require('redux')
const { default: createSagaMiddleware } = require('redux-saga')
const { createLogger } = require('redux-logger')

module.exports = function create (reducers, sagas) {
  const sagaMiddleware = createSagaMiddleware()
  const logger = createLogger({
    // diff: true,
    // logger: { log: () => { console.log(arguments); return '' } },
    colors: {
      title: false,
      action: false,
    },
    stateTransformer: () => '',
  })

  const store = createStore(
    combineReducers(reducers),
    applyMiddleware(sagaMiddleware, logger)
  )

  Object.keys(sagas).forEach(saga => sagaMiddleware.run(sagas[saga]))

  return store
}
