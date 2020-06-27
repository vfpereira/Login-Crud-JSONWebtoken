'use strict'
const HtmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const common = require('./common')

module.exports = {
  mode: 'production',
  entry: common.entry,

  output: common.output,

  optimization: {
    minimize: true,
    mergeDuplicateChunks: true,
    splitChunks: {
      chunks: 'all'
    }
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlPlugin(common.htmlPluginConfig.index),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css'
    })
    // new FaviconsWebpackPlugin(join(common.paths.root, 'img', 'favicon.png'))
  ],

  module: {
    rules: [
      common.standardPreLoader,
      common.jsLoader,
      common.cssLoader(MiniCssExtractPlugin.loader),
      common.fileLoader,
      common.urlLoader
    ]
  }

  /* resolve: {
    alias: Object.assign({}, common.resolve.alias, {
      react: 'preact/compat',
      'react-dom': 'preact/compat'
    })
  }
  */
}
