const { bindActionCreators } = require('redux')

const createStore = require('./store')
const actions = require('./actions')

const reducers = {
  windows: (res, state) => state || {},
}

const sagas = {}
const store = createStore(reducers, sagas)

const StateEngine = {
  store,
  actions: bindActionCreators(actions, store.dispatch)
}

module.exports = StateEngine
