const { takeEvery, put, take } = require('redux-saga/effects')
const { eventChannel, END } = require('redux-saga')

const { makeWindow } = require('./util')
const actions = require('./actions')

function watchWindow (win, targetWindow) {
  return eventChannel(emitter => {
    win.on('closed', () => {
      emitter(actions.windowClosed({ targetWindow }))
      emitter(END)
    })

    // unsubscribe fn
    return () => {}
  })
}

function * createWindow (action) {
  const { id, options } = action.payload

  const win = makeWindow(id, options)
  yield put(actions.windowCreated({ targetWindow: id, electronId: win.id }))

  const windowEventChannel = watchWindow(win, id)
  while (true) {
    const action = yield take(windowEventChannel)
    yield put(action)
  }
}

exports.onCreateWindow = function * onCreateWindow () {
  yield takeEvery(actions.createWindow.toString(), createWindow)
}
