'use strict'
const common = require('./common')
const HtmlPlugin = require('html-webpack-plugin')
const { join } = require('path')
const webpack = require('webpack')
const webpackDevServerWaitpage = require('webpack-dev-server-waitpage')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const clientConfig = {
  target: 'web',
  watch: true,

  mode: 'development',
  devtool: 'source-map',
  entry: common.entry,

  output: Object.assign({}, common.output, {
    filename: '[name].js'
  }),

  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlPlugin(common.htmlPluginConfig.index),
    // new HtmlPlugin(common.htmlPluginConfig.admin)
    new FaviconsWebpackPlugin(join(common.paths.root, 'img', 'favicon.png'))
  ],

  module: {
    rules: [
      common.standardPreLoader,
      {
        test: /\.js$/,
        include: /node_modules\/react-dom/,
        use: ['react-hot-loader/webpack']
      },
      {
        test: /\.jsx?$/,
        include: /node_modules/,
        use: ['react-hot-loader/webpack']
      },
      {
        test: /\.js$/,
        exclude: join(common.paths.root, 'node_modules'),
        include: common.paths.src,
        use: [{
          loader: 'cache-loader'
        },
        {
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true,
            presets: ['@babel/env', '@babel/react'],
            plugins: ['react-hot-loader/babel']
          }
        }]
      },
      common.cssLoader('style-loader'),
      common.fileLoader,
      common.urlLoader
    ]
  },

  resolve: {
    alias: Object.assign({}, common.resolve.alias, {
      'react-dom': '@hot-loader/react-dom'
    })
  },

  optimization: {
    runtimeChunk: {
      name: 'vendor'
    }
  },

  devServer: {
    liveReload: false,
    historyApiFallback: true,
    /*
    historyApiFallback: {
      rewrites: [
        { from: /^\/admin/, to: '/admin.html' }
      ]
    },
    */
    compress: true,
    contentBase: common.paths.dist,
    hot: true,
    noInfo: true,
    onListening: function (server) {
      const port = server.listeningApp.address().port
      console.log('Listening on port:', port)
    },
    staticOptions: {
      redirect: true
    },
    watchContentBase: false,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:5010',
        secure: false
      }
    ],
    port: 3030,
    overlay: {
      warnings: false,
      errors: false
    },
    writeToDisk: false,
    open: true,
    before: (app, server) => {
      app.use(webpackDevServerWaitpage(server))
    }
  }
}

module.exports = clientConfig
