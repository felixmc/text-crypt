// -----@flow

import React, { PureComponent } from 'react'
import { string, bool, func } from 'prop-types'

import 'antd/dist/antd.less'
import { Layout } from 'antd'
import TextEditor from './components/text-editor'

import './style.css'

// import promptPass from '../crypto/components/pass-prompt'
// window.promptPass = promptPass

const { Footer, Content } = Layout

// export const passphrase = 'super long and hard to guess secret'

// type Props = {
//   defaultText: string,
// }

export default class BufferEditor extends PureComponent {
  static propTypes = {
    defaultData: string,
    filePath: string,
    isLoading: bool,
    isSaving: bool,
    onTextChange: func.isRequired,
  }

  static defaultProps = {
    defaultData: '',
    filePath: null,
    isLoading: false,
    isSaving: false,
  }

  componentDidMount () {
    // ipcRenderer.on('file-open', (sender, files) => {
    //   if (files.length) {
    //     this.openFile(files[0])
    //   }
    // })

    // ipcRenderer.on('file-save', (sender) => {
    //   if (!this.state.filePath) {
    //     remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
    //       title: 'Save File',
    //       defaultPath: process.cwd(),
    //       buttonLabel: 'Save',
    //       filters: [{ name: 'TextCrypt Files', extensions: ['txc'] }],
    //     }, (filePath) => {
    //       this.setState({ filePath }, () => {
    //         this.saveFile()
    //       })
    //     })
    //   } else {
    //     this.saveFile()
    //   }
    // })
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

  onTextChange = () => {
    this.props.onTextChange(this.textEditor.value)
  }

  render () {
    return (
      <Layout>
        <div className='titlebar' style={{WebkitAppRegion: 'drag'}} />
        <Layout>
          <Content className='content'>
            {(this.props.isLoading) ||
              <TextEditor
                ref={(c) => { this.textEditor = c }}
                defaultText={this.props.defaultData}
                onChange={this.onTextChange}
                readOnly={this.props.isSaving || this.props.isLoading}
              />}
          </Content>
          <Footer className='status-bar'>
            <span className='filename'>{this.props.filePath || 'unsaved'}</span>
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
