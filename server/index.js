var express = require('express');
var app = express();
var config = require('../config/index.js');
var proxy = require('http-proxy-middleware')
const compression = require('compression'); /** 开启Gzip */

app.set('trust proxy', true);
app.disable('x-powered-by');

app.use(compression());
app.use('/', require('connect-history-api-fallback')());

// 优化 -> dll文件放到static
app.use(express.static(config.distPath));
app.use(express.static(config.buildPath));
app.use(express.static('static'));

if (process.env.NODE_ENV !== 'production') {

  var webpack = require('webpack');
  var webpackConfig = require('../config/webpack/webpack.dev.config.js');
  var webpackCompiled = webpack(webpackConfig);
  // 配置运行时打包
  var webpackDevMiddleware = require('webpack-dev-middleware');
  app.use(webpackDevMiddleware(webpackCompiled, {
    publicPath: config.publicPath,
    stats: { colors: true },
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
  }))

  var webpackHotMiddleware = require('webpack-hot-middleware');
  app.use(webpackHotMiddleware(webpackCompiled));
}

var options = {
  target: 'https://cnodejs.org', // target host 
  changeOrigin: true,               // needed for virtual hosted sites 
  pathRewrite: { '^/nodeapi': '/api/v1' }
}

app.use('/nodeapi', proxy(options))

var server = app.listen(2000, function () {
  var port = server.address().port
  console.log('Open http//localhost:%s', port)
})
