import fs from 'fs'
import path from 'path'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import AceEditor from 'react-ace'
require('brace/keybinding/emacs')
require('brace/mode/markdown')

require('brace/ext/language_tools')
require('brace/ext/statusbar')

// require('./my_theme')

const themes = [ 'ambiance',
  'chaos',
  'chrome',
  'clouds',
  'clouds_midnight',
  'cobalt',
  'crimson_editor',
  'dawn',
  'dreamweaver',
  'eclipse',
  'github',
  'idle_fingers',
  'iplastic',
  'katzenmilch',
  'kr_theme',
  'kuroir',
  'merbivore',
  'merbivore_soft',
  'mono_industrial',
  'monokai',
  'pastel_on_dark',
  'solarized_dark',
  'solarized_light',
  'sqlserver',
  'terminal',
  'textmate',
  'tomorrow',
  'tomorrow_night',
  'tomorrow_night_blue',
  'tomorrow_night_bright',
  'tomorrow_night_eighties',
  'twilight',
  'vibrant_ink',
  'xcode' ]

themes.forEach(theme => require(`brace/theme/${theme}`))

import { Input, Spin, Layout, Menu, Icon, Modal, notification } from 'antd'
const { TextArea } = Input
const { Header, Footer, Sider, Content } = Layout
const { SubMenu } = Menu

import 'antd/dist/antd.css'
import './style.css'

const ipcRenderer = require('electron').ipcRenderer

import { passphrase, loadKeys, encrypt, decrypt } from '../crypto'
const keys = loadKeys()


let unsavedText = ''

class TextCrypt extends Component {
  state = {
    status: {
      text: '',
    },
    savedText: '',
    unsavedText: '',
    filePath: null,
    isLoading: false,
    theme: 'pastel_on_dark',
  }

  componentDidMount () {
    ipcRenderer.on('file-open', (sender, files) => {
      this.openFile(files[0])
    })

    ipcRenderer.on('file-save', (sender) => {
      this.saveFile()
    })
  }

  onTextChange = (text) => {
    unsavedText = text
    // this.setState({ unsavedText: text })
    // return text
  }

  openFile (filePath) {
    console.log('loading raw data..')
    this.setState({ filePath, isLoading: true })
    const text = fs.readFileSync(filePath, 'utf8')

    Promise.resolve(text)
      .then(text => {
        if (text.length) {
          console.log('decrypting', text)
          return decrypt(text, keys, passphrase)
        } else {
          return text
        }
      })
      .then(cleartext => {
        console.log('loading text', cleartext)
        this.setState({ savedText: cleartext, isLoading: false })
      })
      .catch(e => console.log('stuff failed', e))
  }

  saveFile () {
    if (!this.state.filePath) return;
    console.log('saving data..')
    // this.setState({ isLoading: true }, () )
    encrypt(unsavedText, keys, passphrase)
    .then(cyphertext => {
      console.log('data encrypted')
      fs.writeFileSync(this.state.filePath, cyphertext)
      // this.setState({ unsavedText: '', savedText: this.state.unsavedText })
      // this.setState({ isLoading: false })
      notification.success({
        message: 'Save Successful!'
      })
    })
  }

  onLoad = (editor) => {
    editor.focus()
    editor.getSession().setUseWrapMode(true)
  }

  renderModal () {
    return (
      <Modal
        title={null}
        closable={false}
        footer={null}
        width={150}
        wrapClassName="vertical-center-modal"
        style={{textAlign: 'center'}}
        visible={this.state.isLoading}
      >
        <br/>
        <Spin size="large" />
        <br/><br/>
      </Modal>
    )
  }

  renderMenuItems () {
    return [
      <Menu.Item key="6"><Icon type="file-text" />hello_world.txc</Menu.Item>,
      <Menu.Item key="7"><Icon type="file-text" />foobar.txc</Menu.Item>
    ]
  }

  renderContent () {
    if (this.state.isLoading) return null

    return (
      <AceEditor
        ref={(c) => { global.editor = c }}
        mode="markdown"
        theme={this.state.theme}
        name="editor"
        onLoad={this.onLoad}
        onChange={this.onTextChange}
        fontSize={15}
        showPrintMargin={false}
        defaultValue={this.state.savedText}
        width=""
        height=""
        keyboardHandler="emacs"
        style={{ flex: 1 }}
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

  render () {
          // <Header>Header</Header>
          // <Sider>
          //   <Menu
          //     mode="inline"
          //     defaultSelectedKeys={['1']}
          //     style={{ height: '100%', borderRight: 0 }}
          //   >
          //     {this.renderMenuItems()}
          //   </Menu>
          // </Sider>
    return (
      <Layout>
        <div style={{WebkitAppRegion: 'drag',background:'#2C2828',height:'30px'}}></div>
        <Layout>
          <Content className="content">
            {this.renderContent()}
          </Content>
          <Footer className="status-bar">
            <span className="filename">{this.state.filePath || 'unsaved'}</span>
          </Footer>
        </Layout>
        {this.renderModal()}
      </Layout>
    )
  }
}

global.app = ReactDOM.render(<TextCrypt />, document.querySelector('#app'))
