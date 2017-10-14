const path = require('path')

module.exports = {
  target: 'electron',
  entry: path.join(__dirname, './client/index.js'),
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
    path: path.join(__dirname, './build'),
    publicPath: '/',
    filename: 'client.js'
  },
}
