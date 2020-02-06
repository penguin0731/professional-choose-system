var mysql = require('mysql');
module.exports = function () {
    return mysql.createConnection({ //连接数据库的配置
        host: '127.0.0.1', //连接到本机
        port: '3306', //mysql的监听端口
        user: 'root', //访问数据库的账号
        password: '123456', //访问数据库的密码
        database: 'professional-choice-system' //访问的数据库
    })
}
