const bundles = {
  editor: {
    entry: './editor/index.js',
  },
}

exports.keys = Object.keys(bundles)
exports.entries = exports.keys.reduce((entries, key) =>
  Object.assign({
    [key]: bundles[key].entry,
  }, entries)
, {})
