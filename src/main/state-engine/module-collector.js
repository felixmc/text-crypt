function tryRequire (module) {
  try {
    return require(`./${module}`)
  } catch (e) {
    if (module.includes('subscribers')) {
      // console.log('error:', e)
    }
    return null
  }
}

const collections = ['actions', 'reducer', 'sagas', 'selectors']

function parseModules (modules, context) {
  const data = collections.reduce((map, col) => {
    map[col] = {}
    return map
  }, {})

  modules.forEach((mod) => {
    collections.forEach((col) => {
      const module = tryRequire(`${context}${mod}/${col}`)
      if (module) {
        data[col] = Object.assign(data[col], module)
      }
    })
  })

  return data
}

const ModuleCollector = {
  collections,
  parseModules,
}

module.exports = ModuleCollector
