const { bindActionCreators } = require('redux')
const createStore = require('./store')

const ModuleCollector = require('./module-collector')
const modules = ['windows', 'buffers', 'keys', 'editors']
const { actions, reducer, sagas, selectors } = ModuleCollector.parseModules(modules, './')

const store = createStore(reducer, sagas)

const StateEngine = {
  store,
  actions: bindActionCreators(actions, store.dispatch),
  selectors: Object.keys(selectors).reduce((res, selName) => {
    res[selName] = function () {
      const state = store.getState()
      return selectors[selName].apply(null, [state].concat(arguments))
    }
    return res
  }, {}),
}

module.exports = StateEngine
