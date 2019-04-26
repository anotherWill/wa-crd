
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack')
const config = require('../index.js')

module.exports = {
  context: config.rootPath,
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
              ['import', { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
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
      {
        test: /\.(png|jpe?g|gif|svg|jpg)(\?.*)?$/,
        use: 'url-loader?prefix=images/&name=[name]_[hash:8].[ext]&limit=8192&outputPath=images'
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: 'url-loader?prefix=videos/&name=[name]_[hash:8].[ext]'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: 'url-loader?prefix=fonts/&name=[hash:8].[ext]&limit=10000&outputPath=fonts'
      },
    ],
  },
  resolve: {
    alias: {
      '@': config.srcPath
    }
  },
  devtool: 'source-map',
  plugins: [
    // new webpack.DllReferencePlugin({
    //   context: config.rootPath,
    //   manifest: require('../../dist/vendor-manifest.json')
    // }),
    // new ExtractTextPlugin({
    //   filename: 'styles.[contenthash].css'
    // }),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: './template/index.html',
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: function (module) {
    //     if (module.resource && (/^.*\.(css|scss|less)$/).test(module.resource)) {
    //       return false
    //     }
    //     return module.context && module.context.indexOf("node_modules") !== -1;
    //   }
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendors',
    //   minChunks: function (module, count) {
    //     return (
    //       module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       module.resource.indexOf(
    //         path.join(__dirname, '../node_modules')
    //       ) === 0
    //     )
    //   }
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common',
    //   minChunks: Infinity
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: false },
    //   sourceMap: false,
    //   comments: false
    // }),
  ]
}