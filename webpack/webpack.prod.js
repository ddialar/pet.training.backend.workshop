/* eslint-disable import/no-extraneous-dependencies */
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const path = require('path')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, './tsconfig.webpack.json')
            }
          }
        ]
      }
    ]
  },
  mode: 'production',
  entry: [path.join(__dirname, '../src/app.ts')],
  node: {
    __dirname: false,
    __filename: false
  },
  optimization: {
    usedExports: true
  },
  externals: [nodeExternals({})],
  plugins: [
    new CleanWebpackPlugin()
  ]
})
