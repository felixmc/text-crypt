import fs from 'fs'
import path from 'path'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { Input, Spin, Layout, Menu, Icon, Modal, notification } from 'antd'
const { TextArea } = Input
const { Header, Footer, Sider, Content } = Layout
const { SubMenu } = Menu

import TextEditor from './components/TextEditor'

import 'antd/dist/antd.css'
import './style.css'

import { remote, ipcRenderer } from 'electron'
// const ipcRenderer = require('electron').ipcRenderer

import { passphrase, loadKeys, encrypt, decrypt } from '../crypto'
const keys = loadKeys()

class FileEditor extends Component {
  state = {
    savedText: '',
    filePath: null,
    isLoading: false,
    isSaving: false,
  }

  componentDidMount () {
    ipcRenderer.on('file-open', (sender, files) => {
      if (files.length) {
        this.openFile(files[0])
      }
    })

    ipcRenderer.on('file-save', (sender) => {
      console.log('file save')
      debugger
      if (!this.state.filePath) {
        remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
          title: 'Save File',
          defaultPath: process.cwd(),
          buttonLabel: 'Save',
          filters: [{ name: 'TextCrypt Files', extensions: ['txc'] }],
        }, (filePath) => {
          this.setState({ filePath }, () => {
            this.saveFile()
          })
        })
      } else {
        this.saveFile()
      }
    })
  }

  // onTextChange () {
  //   this.setState({
  //     hasChanges: this.textEditor.value !== this.savedText,
  //   })
  // }

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
    const hasChanges = this.textEditor.value !== this.savedText
    if (!this.state.filePath || !hasChanges) return;
    this.setState({ isSaving: true })
    const text = this.textEditor.value
    encrypt(text, keys, passphrase)
    .then(cyphertext => {
      console.log('data encrypted')
      fs.writeFileSync(this.state.filePath, cyphertext)
      notification.success({
        message: 'Save Successful!'
      })
      this.setState({
        isSaving: false,
        savedText: text,
      })
    })
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
        visible={this.state.isLoading || this.state.isSaving}
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
            {(this.state.isLoading) ||
              <TextEditor
                ref={(c) => { this.textEditor = c; global.textEditor = c }}
                defaultText={this.state.savedText}
                onChange={this.onTextChange}
                readOnly={this.state.isSaving}
              />}
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

global.app = ReactDOM.render(<FileEditor />, document.querySelector('#app'))
