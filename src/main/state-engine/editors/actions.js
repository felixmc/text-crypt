const { createActions } = require('redux-actions')
const uuidv4 = require('uuid/v4')

const actions = [{
  CREATE_EDITOR: (payload) => Object.assign({ id: uuidv4() }, payload),
}].concat([
  'EDITOR_ALLOCATED', 'EDITOR_READY',
])

module.exports = createActions.apply(null, actions)
