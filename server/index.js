var express = require('express');
var app = express();
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var config = require('../config/index.js');
const bodyParser = require('body-parser')
var proxy = require('http-proxy-middleware')
const compression = require('compression'); /** 开启Gzip */
var services = require('./services');
var identityKey = 'skey';
var DB = require('./db');

app.set('trust proxy', true);
app.disable('x-powered-by');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
  name: identityKey,
  secret: 'bysjp',  // 用来对session id相关的cookie进行签名
  store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
  resave: false,  // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: 5000 * 60 * 1000  // 有效期，单位是毫秒
  }
}));
app.use(compression());
app.use('/', require('connect-history-api-fallback')());


app.post('/login', function (req, res, next) {
  var sess = req.session;
  let info = req.body
  let param = [info.name, info.password]
  let sql = 'SELECT * FROM user WHERE nickName = ? AND password = ?'
  DB.query(sql, param, (results, fields) => {
    if (!results.length) {
      res.json({ ret_code: 'Error', ret_msg: '用户名或者密码错误' })
    } else {
      req.session.regenerate(function (err) {
        if (err) {
          return res.json({ ret_code: 'Error', ret_msg: '登录失败' });
        }
        req.session.loginUser = info.name
        res.cookie('userType', info.name === 'admin' ? 'admin' : 'normal')
        res.json({ ret_code: 'Success', ret_msg: '登录成功' })
      });
    }
  })
});

app.post('/register', function (req, res, next) {
  services.registerUser(req, res)
})

app.post('/logout', function (req, res, next) {
  // 备注：这里用的 session-file-store 在destroy 方法里，并没有销毁cookie
  // 所以客户端的 cookie 还是存在，导致的问题 --> 退出登陆后，服务端检测到cookie
  // 然后去查找对应的 session 文件，报错
  // session-file-store 本身的bug    

  req.session.destroy(function (err) {
    if (err) {
      res.json({ ret_code: 'Error', ret_msg: '退出登录失败' });
      return;
    }

    // req.session.loginUser = null;
    res.clearCookie(identityKey);
    res.clearCookie('userType')
    res.json({ ret_code: 'Success', ret_msg: '' })
  });
});

// app.get('*', function(req, res, next) {
//   var sess = req.session;
//   var loginUser = sess.loginUser;
//   var isLogined = !!loginUser;
//   next()
// })

app.use(express.static(config.distPath));
app.use(express.static(config.buildPath));
app.use(express.static(__dirname + '/static'));

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

// var options = {
//   target: 'https://cnodejs.org', // target host 
//   changeOrigin: true,               // needed for virtual hosted sites 
//   pathRewrite: { '^/nodeapi': '/api/v1' }
// }

// app.use('/nodeapi', proxy(options))

var server = app.listen(2000, function () {
  var port = server.address().port
  console.log('Open http//localhost:%s', port)
})
