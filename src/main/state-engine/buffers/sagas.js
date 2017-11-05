// click: () => BrowserWindow.getFocusedWindow().webContents.send('file-open', dialog.showOpenDialog({
//   defaultPath: process.cwd(),
//   properties: ['openFile'],
//   filters: [{ name: 'TextCrypt Files', extensions: ['txc'] }],
// })),

// const keys = loadKeys()
// import { loadKeys, encrypt, decrypt } from './crypto'

const { takeEvery, put, call } = require('redux-saga/effects')

const actions = require('./actions')

function * createBuffer (action) {
  yield call(() => new Promise((resolve) => {
    setTimeout(() => resolve(), 1000) // simulate it taking a while to create a buffer to test our editor watch saga
  }))

  yield put(actions.bufferCreated({ targetBuffer: action.payload.id, data: 'hello world!' }))
}

exports.onCreateBuffer = function * onCreateBuffer () {
  yield takeEvery(actions.createBuffer.toString(), createBuffer)
}
