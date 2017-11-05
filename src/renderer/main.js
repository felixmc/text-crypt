import { ipcRenderer } from 'electron'

function loadModule (module) {
  return new Promise((resolve, reject) => {
    // FIXME: hacky way to load the module, require doesn't work for some reason :(
    // const windowApp = global.require(`./${module}`)
    const script = document.createElement('script')
    script.setAttribute('src', `./${module}.js`)
    script.addEventListener('load', (e) => { resolve() }, false)
    document.body.appendChild(script)
  })
}

const TextCrypt = (function () {
  const id = window.location.hash.slice(1)
  const state = {}
  const subs = []

  // #1 subscribe to state syncs from backend
  // we expect calling window-ready will trigger a state update
  // which will trigger a sync which will give us our initial state
  ipcRenderer.on('state-sync', (sender, stateUpdate) => {
    console.log('state-sync', stateUpdate)
    Object.assign(state, stateUpdate)
    console.log('new state', state)
    subs.forEach(sub => sub())
  })

  // #2 tell backend we're ready to initialize this window with an app
  const app = ipcRenderer.sendSync('window-ready', id)

  // #3 load the app bundle
  loadModule(app.bundle)
    .then(() => {
      console.log('script resolved')
    })
    .catch(e => {
      console.error('Error loading bundle', app.bundle, e)
    })

  return {
    getRootNode () {
      return document.querySelector('#app')
    },
    subscribe (cb) {
      subs.push(cb)
    },
    getState () {
      return state
    },
    dispatch (type, payload = {}) {
      console.log('dispatch', type)
      Object.assign(payload, { windowId: id })
      ipcRenderer.send(type, payload)
    },
  }
}())

// FIXME: -- gotta figure out why requiring won't work :(
// ideally we'd pass TextCrypt to the module we required instead of using global
window.TextCrypt = TextCrypt
