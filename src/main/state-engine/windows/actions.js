const { createActions } = require('redux-actions')
const uuidv4 = require('uuid/v4')

const actions = [{
  CREATE_WINDOW: (payload) => Object.assign({ id: uuidv4() }, payload),
}].concat([
  'WINDOW_CREATED', 'WINDOW_CLOSED',
])

module.exports = createActions.apply(null, actions)
