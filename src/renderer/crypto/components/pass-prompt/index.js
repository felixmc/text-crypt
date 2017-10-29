import React, { PureComponent } from 'react'
import { Input, Icon, Modal } from 'antd'

export default function promptPass ({ keyName = 'keyName' } = {}) {
  return new Promise((resolve, reject) => {
    let value = ''
    let inputRef = (input) => {
      input.value
    }

    Modal.confirm({
      title: `Enter passphrase for key ${keyName}`,
      content: <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="passphrase" />
    })
  })
}
