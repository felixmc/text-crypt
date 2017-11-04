// const webpack = require('webpack')
const path = require('path')

const rootDir = path.join(__dirname, '../../')

module.exports = {
  target: 'electron-main',
  entry: {
    main: path.join(__dirname, './index.js'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
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
