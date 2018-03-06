const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const config = require('../index.js');

module.exports = merge(common, {
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
    path: config.buildPath,
    publicPath: config.publicPath,
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})

