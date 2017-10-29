import React from 'react'
import ReactDOM from 'react-dom'
import FileEditor from '../file-editor'

let root = null

function render (props) {
  ReactDOM.render(
    <FileEditor {...props} />
  , root)
}

function update (state) {
  render(state)
}

function initialize (state, node) {
  root = node
  render(state)
}

const editor = {
  update, initialize
}

// console.log('editor >>', editor)

// SUPER HACKYYYYYYY -- gotta figure out why requiring won't work :(
window.onAppReady(editor)

export default editor
