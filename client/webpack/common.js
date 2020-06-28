'use strict'

const { join } = require('path')

const paths = {
  root: join(__dirname, '..'),
  src: join(__dirname, '..', 'src'),
  dist: join(__dirname, '..', 'dist'),
  components: join(__dirname, '..', 'src', 'components'),
  admin: join(__dirname, '..', 'src', 'components', 'admin')
}

module.exports = {
  paths,
  entry: {
    index: join(paths.src, 'index')
  },

  output: {
    path: paths.dist,
    filename: '[name]-[chunkhash].js',
    publicPath: '/'
  },

  htmlPluginConfig: {
    index: {
      template: join(paths.src, 'html', 'index.html'),
      filename: 'index.html'
      // favicon: join(paths.root, 'img', 'favicon.png')
    }
  },

  standardPreLoader: {
    // set up standard-loader as a preloader
    enforce: 'pre',
    test: /\.jsx?$/,
    loader: 'standard-loader',
    exclude: join(paths.root, 'node_modules'),
    options: {
      // config options to be passed through to standard e.g.
      parser: 'babel-eslint'
    }
  },

  jsLoader: {
    test: /\.js$/,
    exclude: join(paths.root, 'node_modules'),
    include: paths.src,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/env', '@babel/react', {
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        ]
      }
    }
  },

  cssLoader: (paramLoader) => ({
    test: /\.(sa|sc|c)ss$/,
    include: [
      join(paths.root, 'styles')
    ],
    use: [
      paramLoader,
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          // Prefer `dart-sass`
          implementation: require('sass')
        }
      }
    ]
  }),

  fileLoader: {
    test: /\.(ico|jpg|jpeg|png|git|eot|otf|webp|svg|ttf|woff|woff2|txt)(\?.*)?$/,
    include: [
      paths.src,
      [join(paths.root, 'images'), join(paths.root, 'fonts', 'poppins')]
    ],
    use: {
      loader: 'file-loader',
      query: {
        name: 'media/[name].[hash:8].[ext]'
      }
    }
  },

  urlLoader: {
    test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
    include: paths.src,
    use: {
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: 'media/[name].[hash:8].[ext]'
      }
    }
  },

  resolve: {
    alias: {
      src: paths.src,
      styles: join(paths.root, 'styles'),
      components: join(paths.src, 'components'),
      layout: join(paths.src, 'components', 'layout'),
      imagens: join(paths.root, 'img')
    }
  }
}
