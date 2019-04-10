var DB = require('./db');

const registerUser = function (req, res) {
  let info = req.body
  let param = [info.userName, info.nickName, info.password, info.phone, info.address.join(''), 'normal']
  DB.query('INSERT INTO user(userName, nickName, password, phone, address, type) VALUES(?,?,?,?,?, ?)', param, (result, fields) => {
    res.json({
      ret_msg: '注册成功',
      ret_code: 'Success'
    })
  })
}

module.exports = {
  registerUser,
}

