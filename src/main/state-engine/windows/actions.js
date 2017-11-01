const { createActions } = require('redux-actions')

const actions = ['CREATE_WINDOW', 'WINDOW_CREATED', 'WINDOW_CLOSED']

module.exports = createActions.apply(null, actions)
