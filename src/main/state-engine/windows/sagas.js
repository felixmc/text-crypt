const { select, takeEvery, put, take, call } = require('redux-saga/effects')
const { eventChannel, END } = require('redux-saga')

const { makeWindow } = require('./util')
const actions = require('./actions')

function watchWindow (win) {
  return eventChannel(emitter => {
    const targetWindow = win.id

    win.on('closed', () => {
      emitter(actions.windowClosed({ targetWindow }))
      emitter(END)
    })

    // unsubscribe fn
    return () => {}
  })
}

function* createWindow (action) {
  const { bundle, options, callback } = action.payload

  const win = makeWindow(bundle, options)
  yield put(actions.windowCreated({ id: win.id, bundle }))
  if (callback) {
    callback.payload.windowId = win.id
    yield put(callback)
  }

  const windowEventChannel = watchWindow(win)
  while (true) {
    const action = yield take(windowEventChannel)
    yield put(action)
  }
}

exports.onCreateWindow = function* onCreateWindow () {
  yield takeEvery(actions.createWindow.toString(), createWindow)
}
