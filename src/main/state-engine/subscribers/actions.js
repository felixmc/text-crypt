const { createActions } = require('redux-actions')
const uuidv4 = require('uuid/v4')

const actions = [{
  CREATE_SUBSCRIPTION: (payload) => Object.assign({ id: uuidv4() }, payload),
}].concat([
  'SUBSCRIPTION_CREATED',
])

module.exports = createActions.apply(null, actions)
