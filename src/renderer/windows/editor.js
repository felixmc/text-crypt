import React from 'react'
import ReactDOM from 'react-dom'
import BufferEditor from '../buffer-editor'
import debounce from '../util/debounce'

const TYPE_SAVE_DELAY = 1000

// FIXME: gotta figure out why requiring won't work :( so we can stop using globals
const TextCrypt = window.TextCrypt

function render (props, root) {
  ReactDOM.render(
    <BufferEditor {...props} />
    , root)
}

function renderTextCrypt () {
  const state = TextCrypt.getState()
  const props = Object.assign({
    onTextChange: debounce(text => {
      TextCrypt.dispatch('BUFFER_UPDATE', { text })
    }, TYPE_SAVE_DELAY),
  }, state)
  render(props, TextCrypt.getRootNode())
}

TextCrypt.subscribe(renderTextCrypt)
