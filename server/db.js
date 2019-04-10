let mysql = require('mysql');
var databaseConfig = require('./mysql.config');

module.exports = {
  query: function (sql, params, callback) {
    var connection = mysql.createConnection(databaseConfig);
    connection.connect(function (err) {
      if (err) {
        console.log('数据库链接失败');
        throw err;
      }
      connection.query(sql, params, function (err, results, fields) {
        if (err) {
          console.log('数据操作失败');
          throw err;
        }
        callback && callback(results, fields);
        connection.end(function (err) {
          if (err) {
            console.log('关闭数据库连接失败！');
            throw err;
          }
        });
      });
    });
  }
};
