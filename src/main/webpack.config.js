// const webpack = require('webpack')
const path = require('path')

const rootDir = path.join(__dirname, '../../')

module.exports = {
  target: 'electron-main',
  entry: {
    main: path.join(__dirname, './index.js'),
  },
  externals: {
    'electron-debug': 'electron-debug',
    'electron': 'electron',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader',
          'eslint-loader?emitWarning=true',
        ],
      },
    ],
  },
  output: {
    path: path.join(rootDir, 'build'),
    publicPath: '/',
    filename: '[name].js',
  },
  plugins: [
    // new webpack.BannerPlugin({ raw: true, entryOnly: false })
  ],
}
