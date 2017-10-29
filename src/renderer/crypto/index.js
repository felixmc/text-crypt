import openpgp, { key, message } from 'openpgp'
import fs from 'fs'
import path from 'path'

openpgp.initWorker()

const paths = {
  pub: './pgp_key.pub',
  priv: './pgp_key',
}

export function loadKeys () {
  return {
    name: path.resolve(paths.priv),
    pubKey: key.readArmored(fs.readFileSync(paths.pub, 'utf8')).keys[0],
    privKey: key.readArmored(fs.readFileSync(paths.priv, 'utf8')).keys[0],
  }
}

export function decrypt (data, keys, passphrase) {
  keys.privKey.decrypt(passphrase)

  return openpgp.decrypt({
    publicKeys: keys.pubKey,
    privateKey: keys.privKey,
    message: message.readArmored(data),
  }).then((plaintext) => plaintext.data)
}

export function encrypt (data, keys, passphrase) {
  console.log('encryptin them mothafakas')
  keys.privKey.decrypt(passphrase)

  return openpgp.encrypt({
    publicKeys: keys.pubKey,
    privateKeys: keys.privKey,
    data,
  }).then((ciphertext) => ciphertext.data)
}
