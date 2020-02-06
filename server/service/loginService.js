const createConnection = require('../dao/dbutil');
const md5 = require('md5');

function queryUserByLoginId(login_id) {
    return new Promise((res, rej) => {
        const conn = createConnection();
        conn.connect();

        const sql = 'select * from person where login_id=?';
        const params = [login_id];
        conn.query(sql, params, function (err, results) {
            err ? rej(err) : res(results);
        })

        conn.end();
    })
}

module.exports = {
    queryUserByLoginId
}