const { select, takeEvery, put } = require('redux-saga/effects')
const { makeWindow } = require('./util')
const actions = require('./actions')

function* createWindow (action) {
  const { type, options, data } = action.payload

  const win = makeWindow(type, options)
  const id = win.id

  // win.on('closed', () => {
  //   put(actions.windowClosed(id))
  // })

  yield put(actions.windowCreated({ id, type, data }))
}

exports.onCreateWindow = function* onCreateWindow () {
  yield takeEvery(actions.createWindow.toString(), createWindow)
}
