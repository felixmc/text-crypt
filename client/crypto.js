import openpgp, { key, message } from 'openpgp'
import fs from 'fs'

export const passphrase = 'super long and hard to guess secret'

export function loadKeys () {
  return {
    pubKey: key.readArmored(fs.readFileSync('pgp_key.pub', 'utf8')).keys[0],
    privKey: key.readArmored(fs.readFileSync('pgp_key', 'utf8')).keys[0],
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
  keys.privKey.decrypt(passphrase)

  return openpgp.encrypt({
    publicKeys: keys.pubKey,
    privateKeys: keys.privKey,
    data,
  }).then((ciphertext) => ciphertext.data)
}
