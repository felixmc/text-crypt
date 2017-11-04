const path = require('path')
const fs = require('fs')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const rootDir = path.join(__dirname, '../../')

const lessToJs = require('less-vars-to-js')
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './theme.less'), 'utf8'))

const windowFiles = fs.readdirSync(path.join(__dirname, 'windows')).filter(file => file.endsWith('.js'))
const windowMap = windowFiles.reduce((map, file) =>
  Object.assign(map, {
    [file.replace(/\.js$/, '')]: path.join(__dirname, 'windows', file),
  }),
{})

const main = path.join(__dirname, 'main.js')
const entries = Object.assign(windowMap, { main })

module.exports = {
  target: 'electron-renderer',
  entry: entries,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader',
            options: {
              modifyVars: themeVariables,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
  output: {
    path: path.join(rootDir, 'build/renderer'),
    publicPath: '/',
    filename: '[name].js',
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.join(rootDir, 'node_modules/openpgp/dist/openpgp.js') },
      { from: path.join(rootDir, 'node_modules/openpgp/dist/openpgp.worker.js') },
      { from: path.join(__dirname, 'index.html') },
    ]),
  ],
}
