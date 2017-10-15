const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const { entries } = require('./bundles')

module.exports = {
  context: path.join(__dirname, '/src'),
  target: 'electron',
  entry: entries,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  output: {
    path: path.join(__dirname, './public'),
    publicPath: '/',
    filename: '[name].js',
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.join(__dirname, '../node_modules/openpgp/dist/openpgp.js') },
      { from: path.join(__dirname, '../node_modules/openpgp/dist/openpgp.worker.js') },
    ])
  ],
}
