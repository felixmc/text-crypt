const { bindActionCreators } = require('redux')
const createStore = require('./store')

const ModuleCollector = require('./module-collector')
const modules = ['windows', 'subscribers', 'buffers', 'keys', 'editors']
const { actions, reducer, sagas, selectors } = ModuleCollector.parseModules(modules, './')

const store = createStore(reducer, sagas)

const StateEngine = {
  store,
  actions: bindActionCreators(actions, store.dispatch),
  selectors: Object.keys(selectors).reduce((res, selName) => {
    res[selName] = function () {
      const state = store.getState()
      const args = Array.prototype.slice.call(arguments)
      return selectors[selName].apply(null, [state].concat(args))
    }
    return res
  }, {}),
}

module.exports = StateEngine
