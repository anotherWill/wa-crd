const webpack = require('webpack');
const path = require('path')
const config = require('../index.js');
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  context: config.rootPath,
  entry: {
    main: [
      'babel-polyfill',
      './src/index.js',
    ]
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
    path: config.buildPath,
    publicPath: config.publicPath
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      sourceMap: false,
      comments: false
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
})
