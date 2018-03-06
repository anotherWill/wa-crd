const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('../index.js');

module.exports = {
  context: config.rootPath,
  entry: {
    main: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './src/index.js'
    ]
  },
  output: {
    path: config.publicPath,
    publicPath: config.publicPath,
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [config.srcPath], // 指定检查的目录
        exclude: function(path) {
          // 路径中含有 node_modules 的就不去解析。
          var isNpmModule = !!path.match(/node_modules/)
          return isNpmModule
        },
        options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
          formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'es2015', 'stage-0', 'react'],
            plugins: [
              ['react-hot-loader/babel'],
              ['import', { "libraryName": "antd", "style": "css" }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },
      // {
      //   // 当前项目的less文件，启用CSS modules
      //   test: /\.less$/,
      //   include: [config.srcPath],
      //   exclude: [config.libPath],
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: [
      //       {
      //         loader: 'css-loader',
      //         options: {
      //           modules: true,
      //           importLoaders: 3,
      //           localIdentName: '[path][name]-[local]-[hash:base64:5]'
      //         }
      //       },
      //       {
      //         loader: path.resolve(__dirname, '..', 'loader/less-css-modules-assets-fix-loader.js')
      //       },
      //       {
      //         loader: 'postcss-loader',
      //         options: {
      //           plugins: [
      //             require('autoprefixer')()
      //           ]
      //         }
      //       },
      //       {
      //         loader: 'less-loader'
      //       }
      //     ]
      //   })
      // },
      // {
      //   // 当前项目，启用CSS modules
      //   test: /\.css$/,
      //   include: [config.srcPath],
      //   exclude: [config.libPath],
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: [
      //       {
      //         loader: 'css-loader',
      //         options: {
      //           modules: true,
      //           importLoaders: 1,
      //           localIdentName: '[path][name]-[local]-[hash:5]'
      //         }
      //       },
      //       {
      //         loader: 'postcss-loader',
      //         options: {
      //           plugins: [
      //             require('autoprefixer')()
      //           ]
      //         }
      //       }
      //     ]
      //   })
      // },
      // {
      //   // 依赖库，禁用CSS modules
      //   test: /\.css$/,
      //   include: [config.libPath],
      //   exclude: [config.srcPath],
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       {
      //         loader: 'css-loader',
      //         options: {
      //           importLoaders: 1
      //         }
      //       },
      //       {
      //         loader: 'postcss-loader',
      //         options: {
      //           plugins: [
      //             require('autoprefixer')()
      //           ]
      //         }
      //       }
      //     ]
      //   })
      // },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: 'url-loader?prefix=images/&name=[name]_[hash:8].[ext]&limit=8192'
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: 'url-loader?prefix=videos/&name=[name]_[hash:8].[ext]'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: 'url-loader?prefix=fonts/&name=[name_[hash:8].[ext]&limit=10000'
      },
      // {
      //   test: /\.woff(\?.*)?$/,
      //   use: 'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=application/font-woff'
      // },
      // {
      //   test: /\.woff2(\?.*)?$/,
      //   use: 'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=application/font-woff2'
      // },
      // {
      //   test: /\.otf(\?.*)?$/,
      //   use: 'file-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=font/opentype'
      // },
      // {
      //   test: /\.ttf(\?.*)?$/,
      //   use: 'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=application/octet-stream'
      // },
      // {
      //   test: /\.eot(\?.*)?$/,
      //   use: 'file-loader?prefix=fonts/&name=[name]_[hash:8].[ext]'
      // },
      // {
      //   test: /\.svg(\?.*)?$/,
      //   use: 'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=image/svg+xml'
      // },
      // {
      //   test: /\.(png|jpg|jpeg)$/,
      //   use: 'url-loader?limit=8192'
      // }
    ],
  },
  resolve: {
    alias: {
      '@': config.srcPath
    }
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HtmlWebpackPlugin({
      template: './template/index.html'
    }),
    new ExtractTextPlugin({
      filename: 'styles.[contenthash].css'
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        if (module.resource && (/^.*\.(css|scss|less)$/).test(module.resource)) {
          return false
        }
        return module.context && module.context.indexOf("node_modules") !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: Infinity
    }),
    new webpack.DllReferencePlugin({
      context: config.rootPath,
      manifest: require('../../manifest.json'),
    }),
  ]
}
