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
// app.use(compression());
app.use('/', require('connect-history-api-fallback')());


// app.use(express.static(config.distPath));
// app.use(express.static(config.buildPath));
app.use(express.static(__dirname + '/static'));


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
        res.cookie('userId', results[0].id)
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

app.post('/applyActivity', function (req, res, next) {
  services.applyActivity(req, res)
})

app.post('/getPersonalActivity', function(req, res, next) {
  services.getPersonalActivity(req, res)
})

app.post('/deleteActivity', function(req, res, next) {
  services.deleteActivity(req, res)
})

app.post('/getNewActivity', function(req, res, next) {
  services.getNewActivity(req, res)
})

app.post('/passActivity', function(req, res, next) {
  services.passActivity(req, res)
})

app.post('/returnActivity', function(req, res, next) {
  services.returnActivity(req, res)
})

app.post('/getActivity', function(req, res, next) {
  services.getActivity(req, res)
})

app.post('/joinActivity', function(req, res, next) {
  services.joinActivity(req, res)
})

app.post('/unJoinActivity', function(req, res, next) {
  services.unJoinActivity(req, res)
})

app.post('/getJoinedActivity', function(req, res, next) {
  services.getJoinedActivity(req, res)
})

app.post('/getUserInfo', function(req, res, next) {
  services.getUserInfo(req, res)
})

app.post('/updateInfo', function(req, res, next) {
  services.updateInfo(req, res)
})

app.post('/getAllUser', function(req, res, next) {
  services.getAllUser(req, res)
})

app.post('/setAdmin', function(req, res, next) {
  services.setAdmin(req, res)
})

app.post('/setNormal', function(req, res, next) {
  services.setNormal(req, res)
})

app.post('/deleteUser', function(req, res, next) {
  services.deleteUser(req, res)
})

app.post('/addNotice', function(req, res, next) {
  services.addNotice(req, res)
})


app.post('/getNotice', function(req, res, next) {
  services.getNotice(req, res)
})

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
var server = app.listen(8001, function () {
  var port = server.address().port
  console.log('Open http//127.0.0.1:%s', port)
})
