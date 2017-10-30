const { bindActionCreators, combineReducers } = require('redux')
const createStore = require('./store')

const ModuleCollector = require('./module-collector')
const modules = ['windows', 'buffers', 'keys', 'editors']
const { actions, reducer, sagas } = ModuleCollector.parseModules(modules, './')

const rootReducer = combineReducers(reducer)
const store = createStore(rootReducer, sagas)

const StateEngine = {
  store,
  actions: bindActionCreators(actions, store.dispatch)
}

module.exports = StateEngine
