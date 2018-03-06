const path    = require('path')
const webpack = require('webpack')
const config = require('../index')

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'react-router-dom', 'axios', 'antd']
  },
  output: {
    path: config.distPath,
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      sourceMap: false,
      comments: false
    }),
    new webpack.DllPlugin({
      path: path.resolve(config.distPath, '[name]-manifest.json'),
      name: '[name]_library',
      context: config.distPath,
    })
  ]
};