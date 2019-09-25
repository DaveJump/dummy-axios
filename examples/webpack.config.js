const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
]

const entry = fs.readdirSync(__dirname).reduce((entries, dir) => {
  const fullDir = path.join(__dirname, dir)
  const entry = path.join(fullDir, 'app.ts')

  if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
    entries[dir] = ['webpack-hot-middleware/client', entry]

    plugins.push(
      new HtmlPlugin({
        template: `${fullDir}/index.html`,
        filename: `${dir}.html`,
        chunks: [dir]
      })
    )
  }
  return entries
}, {})

module.exports = {
  mode: 'development',

  /**
   * Examples multi-entries config
   */
  entry,

  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    publicPath: '/__build__/'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  plugins
}
