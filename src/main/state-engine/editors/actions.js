const { createActions } = require('redux-actions')

const actions = ['CREATE_EDITOR', 'EDITOR_CREATED']

module.exports = createActions.apply(null, actions)
