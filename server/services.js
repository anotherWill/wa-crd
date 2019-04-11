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

const applyActivity = function(req, res) {
  let info = req.body
  let param = [info.name, info['range-time-picker'][0], info['range-time-picker'][1], info.address, info.description, 'pending', info.userid]
  let sql = 'INSERT INTO activity(name, start_time, end_time, address, description, status, userid) VALUES(?,?,?,?, ?, ?, ?)'
  DB.query(sql, param, (result, fields) => {
    res.json({
      ret_msg: '申请成功, 请耐心等待管理员审核活动！',
      ret_code: 'Success'
    })
  })
}

const getPersonalActivity = function(req, res) {
  let info = req.body
  let param = [info.userid]
  let sql = 'SELECT * FROM activity WHERE userid = ?'
  DB.query(sql, param, (result, fields) => {
    res.json({
      ret_msg: '',
      ret_code: 'Success',
      list: result
    })
  })
}

const deleteActivity = function(req, res) {
  let info = req.body
  let param = [info.activityId]
  let sql = 'DELETE FROM activity WHERE id= ?'
  DB.query(sql, param, (result, fields) => {
    res.json({
      ret_msg: '删除成功',
      ret_code: 'Success',
    })
  })
}

module.exports = {
  registerUser,
  applyActivity,
  getPersonalActivity,
  deleteActivity,
}

