import { remote, ipcRenderer } from 'electron'
import React, { Component } from 'react'
import { Layout, message } from 'antd'
const { Footer, Content } = Layout
// const { SubMenu } = Menu

import TextEditor from './components/text-editor'
import promptPass from '../crypto/components/pass-prompt'

window.promptPass = promptPass

import 'antd/dist/antd.less'
import './style.css'

// import { loadKeys, encrypt, decrypt } from '../crypto'

// export const passphrase = 'super long and hard to guess secret'

export default class FileEditor extends Component {
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

  // openFile (filePath) {
  //   this.setState({ filePath, isLoading: true })
  //   const text = fs.readFileSync(filePath, 'utf8')

  //   promptPass({ keyName: keys.name })
  //     .then(passphrase => ({
  //       passphrase,
  //       text,
  //     }))
  //     .then(({ text, passphrase }) => {
  //       if (text.length) {
  //         return decrypt(text, keys, passphrase)
  //       } else {
  //         return text
  //       }
  //     })
  //     .then(cleartext => {
  //       this.setState({ savedText: cleartext, isLoading: false })
  //     })
  //     .catch(e => {
  //       console.error('Opening file failed', e)
  //       message.warning('Open failed')
  //     })
  // }

  // saveFile () {
  //   const hasChanges = this.textEditor.value !== this.savedText
  //   if (!this.state.filePath || !hasChanges) return
  //   message.loading('Saving..')
  //   this.setState({ isSaving: true })
  //   const text = this.textEditor.value
  //   encrypt(text, keys, passphrase)
  //     .then(cyphertext => {
  //       fs.writeFileSync(this.state.filePath, cyphertext)
  //       message.success('Save successful')
  //       this.setState({
  //         isSaving: false,
  //         savedText: text,
  //       })
  //     })
  //     .catch(e => {
  //       console.error('saving file failed', e)
  //       message.error('Save failed')
  //     })
  // }

  // renderMenuItems () {
  //   return [
  //     <Menu.Item key='6'><Icon type='file-text' />hello_world.txc</Menu.Item>,
  //     <Menu.Item key='7'><Icon type='file-text' />foobar.txc</Menu.Item>,
  //   ]
  // }

  render () {
    return (
      <Layout>
        <div className='titlebar'></div>
        <Layout>
          <Content className='content'>
            {(this.state.isLoading) ||
              <TextEditor
                ref={(c) => { this.textEditor = c; global.textEditor = c }}
                defaultText={this.state.savedText}
                onChange={this.onTextChange}
                readOnly={this.state.isSaving}
              />}
          </Content>
          <Footer className='status-bar'>
            <span className='filename'>{this.state.filePath || 'unsaved'}</span>
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
