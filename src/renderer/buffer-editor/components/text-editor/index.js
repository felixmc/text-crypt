import React, { Component } from 'react'
import { string, func, bool } from 'prop-types'

import AceEditor from 'react-ace'
import 'brace/ext/language_tools' // autocomplete
import 'brace/keybinding/emacs'
import 'brace/mode/markdown'

import './themes'
import './style.css'

export default class TextEditor extends Component {
  static propTypes = {
    theme: string,
    defaultText: string,
    onChange: func,
    readOnly: bool,
  }

  static defaultProps = {
    theme: 'pastel_on_dark',
    defaultText: '',
    onChange: () => {},
    readOnly: false,
  }

  get value () {
    return this.editor ? this.editor.getValue() : this.props.defaultText
  }

  shouldComponentUpdate () {
    // re-rendering AceEditor seems to clear the value so we wanna avoid that
    // we'll need a better solution eventually
    return false
  }

  onLoad = (editor) => {
    this.editor = editor
    editor.focus()
    editor.getSession().setUseWrapMode(true)
  }

  render () {
    return (
      <AceEditor
        defaultValue={this.props.defaultText}
        readOnly={this.props.readOnly}
        mode='markdown'
        keyboardHandler='emacs'
        theme={this.props.theme}
        style={{ flex: 1 }}
        width=''
        height=''
        fontSize={14}
        showPrintMargin={false}
        onLoad={this.onLoad}
        onChange={this.props.onChange}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    )
  }
}
