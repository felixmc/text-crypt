function tryRequire (module) {
  console.log('MODULE',module)
  try {
    return require(`./${module}`)
  } catch (e) {
    return null
  }
}

const collections = ['actions', 'reducer', 'sagas']

function parseModules (modules, context) {
  const data = collections.reduce((map, col) => {
    map[col] = {}
    return map
  }, {})

  modules.forEach((mod) => {
    collections.forEach((col) => {
      const module = tryRequire(`${context}/${mod}/${col}`)
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
