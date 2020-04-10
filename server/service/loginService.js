const createConnection = require('../dao/dbutil');

exports.queryUserByLoginId = async function(login_id) {
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

exports.queryLoginUser = async function(login_id, role_id) {
    return new Promise((res, rej) => {
        const conn = createConnection();
        conn.connect();

        var sql;
        if(+role_id === 1) {
            sql = `select
                        person.*,
                        grade.grade_name,
                        major.major_name
                    from
                        person, grade, major
                    where
                        person.grade_id=grade.grade_id
                        and person.major_id=major.major_id
                        and login_id=?`;
        } else if(+role_id == 2) {
            sql = `select * from person where login_id=?`;
        } else {
            sql = `select
                        person.*,
                        role.role_name
                    from
                        person, role
                    where
                        person.role_id=role.role_id
                        and login_id=?`;
        }
        const params = [login_id];
        conn.query(sql, params, function (err, results) {
            err ? rej(err) : res(results);
        });

        conn.end();
    })
}

exports.changePwd = async function(person) {
    return new Promise((res, rej) => {
        const conn = createConnection();
        conn.connect();

        const sql = 'update person set ? where login_id=\'';
        conn.query(sql + person.login_id + '\'', person,
            function(err, results) {
                err ? rej(err) : res({msg: '修改成功'});
            });

        conn.end();
    })
}
