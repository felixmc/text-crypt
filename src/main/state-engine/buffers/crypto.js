// const openpgp = { key, message } = require('openpgp')
// const fs = require('fs')
// const path = require('path')

// openpgp.initWorker()

// const paths = {
//   pub: './pgp_key.pub',
//   priv: './pgp_key',
// }

// exports.loadKeys = function loadKeys () {
//   return {
//     name: path.resolve(paths.priv),
//     pubKey: key.readArmored(fs.readFileSync(paths.pub, 'utf8')).keys[0],
//     privKey: key.readArmored(fs.readFileSync(paths.priv, 'utf8')).keys[0],
//   }
// }

// exports.decrypt = function decrypt (data, keys, passphrase) {
//   keys.privKey.decrypt(passphrase)
//   return openpgp.decrypt({
//     publicKeys: keys.pubKey,
//     privateKey: keys.privKey,
//     message: message.readArmored(data),
//   }).then((plaintext) => plaintext.data)
// }

// exports.encrypt = function encrypt (data, keys, passphrase) {
//   keys.privKey.decrypt(passphrase)
//   return openpgp.encrypt({
//     publicKeys: keys.pubKey,
//     privateKeys: keys.privKey,
//     data,
//   }).then((ciphertext) => ciphertext.data)
// }
