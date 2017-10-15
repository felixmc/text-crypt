const path = require('path')
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
    path: path.join(__dirname, './public/bundles'),
    publicPath: '/',
    filename: '[name].js',
  },
}
