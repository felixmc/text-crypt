const { takeEvery, put, take, select } = require('redux-saga/effects')

const actions = require('./actions')
const { createWindow, windowCreated } = require('../windows/actions')
const { createBuffer, bufferCreated } = require('../buffers/actions')

const windowOptions = { width: 900, height: 750, titleBarStyle: 'hidden' }

function * watchAllocatedEditor (action) {
  const { windowId, bufferId, targetEditor } = action.payload
  let ready = false

  while (!ready) {
    const windowState = yield select(state => state.windows[windowId].state)
    const bufferState = yield select(state => state.buffers[bufferId].state)

    if (windowState === 'READY' && bufferState === 'READY') {
      ready = true
      yield put(actions.editorReady({ targetEditor }))
    } else {
      yield take([windowCreated.toString(), bufferCreated.toString()])
    }
  }
}

// idk if sagas are meant to be used this wayyyyyy but this saga just watches the
// editors state for allocated editors and checks on the status of their windows/buffers
// and marks editors as ready when their dependencies are ready
exports.onEditorAllocated = function * onEditorAllocated () {
  yield takeEvery(actions.editorAllocated.toString(), watchAllocatedEditor)
}

function * createEditor (action) {
  const windowAction = createWindow({ bundle: 'editor', options: windowOptions })
  const windowId = windowAction.payload.id

  const bufferAction = createBuffer()
  const bufferId = bufferAction.payload.id

  yield put(windowAction)
  yield put(bufferAction)
  yield put(actions.editorAllocated({ windowId, bufferId }))
}

exports.onCreateEditor = function * onCreateEditor () {
  yield takeEvery(actions.createEditor.toString(), createEditor)
}
