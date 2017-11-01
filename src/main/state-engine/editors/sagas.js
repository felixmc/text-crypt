const { select, takeEvery, put } = require('redux-saga/effects')
const uuidv4 = require('uuid/v4')

const actions = require('./actions')
const { createWindow, windowCreated } = require('../windows/actions')

const options = { width: 900, height: 750, titleBarStyle: 'hidden' }

function* createEditor (action) {
  yield put(createWindow({ bundle: 'editor', options, callback: { type: actions.editorCreated, payload: { id: uuidv4() } } }))
}

exports.onCreateEditor = function* onCreateEditor () {
  yield takeEvery(actions.createEditor.toString(), createEditor)
}

function* onWindowCreated (action) {
  if (action.payload.bundle === 'editor') {
    yield put(actions.editorCreated({ id: uuidv4(), windowId: action.payload.id }))
  }
}

exports.onEditorWindowCreated = function* onEditorWindowCreated () {
  yield takeEvery(windowCreated.toString(), onWindowCreated)
}
