import { remote, ipcRenderer } from 'electron'

const appName = location.hash.slice(1)
const windowApp = global.require(`./${appName}`)

const root = document.querySelector('#app')

console.log('window app', windowApp)

// #1 when window loads, register it with backend and receive initial state
const initialState = ipcRenderer.send('register-window', 'stringvar', { prop: 'val' })

// #2 initialize the window app with that initial state
windowApp.initialize(initialState, root)

// #3 register future state updates
ipcRenderer.on('state-update', (sender, state) => {
  windowApp.update(state)
})
