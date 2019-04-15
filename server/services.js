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

const getNewActivity = function(req, res) {
  let info = req.body
  let param = [info.activityId]
  let sql = 'SELECT * FROM activity WHERE status = "pending"'
  DB.query(sql, [], (result, fields) => {
    res.json({
      ret_msg: '',
      ret_code: 'Success',
      list: result
    })
  })
}

const getActivity = function(req, res) {
  let info = req.body
  let param = [info.activityId]
  let sql = 'SELECT * FROM activity WHERE status = "pass"'
  DB.query(sql, [], (result, fields) => {
    res.json({
      ret_msg: '',
      ret_code: 'Success',
      list: result
    })
  })
}

const passActivity = function(req, res) {
  let info = req.body
  let param = [info.id]
  let sql = 'UPDATE activity SET status = "pass" WHERE id = ?'
  DB.query(sql, param, (result, fields) => {
    res.json({
      ret_msg: '操作成功',
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

const returnActivity = function(req, res) {
  let info = req.body
  let param = [info.id]
  let sql = 'UPDATE activity SET status = "unpass" WHERE id = ?'
  DB.query(sql, param, (result, fields) => {
    res.json({
      ret_msg: '操作成功',
      ret_code: 'Success',
      list: result
    })
  })
}

const joinActivity = function(req, res) {
  let info = req.body
  let param = [info.userid, info.id,]
  let sql = 'UPDATE activity SET userid = ? WHERE id = ?'
  DB.query(sql, param, (result, fields) => {
    res.json({
      ret_msg: '活动参加成功',
      ret_code: 'Success',
      list: result
    })
  })
}

const unJoinActivity = function(req, res) {
  let info = req.body
  let param = [info.id]
  let sql = 'UPDATE activity SET userid = NULL WHERE id = ?'
  DB.query(sql, param, (result, fields) => {
    res.json({
      ret_msg: '取消成功',
      ret_code: 'Success',
      list: result
    })
  })
}

const getJoinedActivity = function(req, res) {
  let info = req.body
  let param = [info.userid]
  let sql = 'SELECT * FROM activity WHERE userid = ? and status = "pass"'
  DB.query(sql, param, (result, fields) => {
    res.json({
      ret_msg: '',
      ret_code: 'Success',
      list: result
    })
  })
}

const getUserInfo = function(req, res) {
  let info = req.body
  let param = [info.userid]
  let sql = 'SELECT * FROM user WHERE id = ?'
  DB.query(sql, param, (result, fields) => {
    res.json({
      ret_msg: '',
      ret_code: 'Success',
      list: result
    })
  })
}

const updateInfo = function(req, res) {
  let info = req.body
  let param = [info.userName, info.nickName, info.phone, info.favor, info.sex, info.userid]
  let sql = 'UPDATE user SET userName = ?, nickName = ?, phone = ?, favor = ?, sex = ? WHERE id = ?'
  DB.query(sql, param, (result, fields) => {
    res.json({
      ret_msg: '保存成功',
      ret_code: 'Success',
    })
  })
}


const getAllUser = function(req, res) {
  let info = req.body
  let param = [info.userid]
  let sql = 'SELECT * FROM user'
  DB.query(sql, param, (result, fields) => {
    res.json({
      ret_msg: '',
      ret_code: 'Success',
      list: result
    })
  })
}

const setAdmin = function(req, res) {
  let info = req.body
  let param = [info.id]
  let sql = 'UPDATE user SET type = "admin" WHERE id = ?'
  DB.query(sql, param, (result, fields) => {
    res.json({
      ret_msg: '操作成功',
      ret_code: 'Success',
      list: result
    })
  })
}

const setNormal = function(req, res) {
  let info = req.body
  let param = [info.id]
  let sql = 'UPDATE user SET type = "normal" WHERE id = ?'
  DB.query(sql, param, (result, fields) => {
    res.json({
      ret_msg: '操作成功',
      ret_code: 'Success',
      list: result
    })
  })
}

const deleteUser = function(req, res) {
  let info = req.body
  let param = [info.id]
  let sql = 'DELETE FROM user  WHERE id = ?'
  DB.query(sql, param, (result, fields) => {
    res.json({
      ret_msg: '操作成功',
      ret_code: 'Success',
      list: result
    })
  })
}

module.exports = {
  registerUser,
  applyActivity,
  getPersonalActivity,
  deleteActivity,
  getNewActivity,
  passActivity,
  returnActivity,
  getActivity,
  joinActivity,
  unJoinActivity,
  getJoinedActivity,
  getUserInfo,
  updateInfo,
  getAllUser,
  setAdmin,
  setNormal,
  deleteUser
}

