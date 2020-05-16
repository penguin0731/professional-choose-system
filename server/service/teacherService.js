const createConnection = require('../dao/dbutil');
const md5 = require('md5');

/**
 * 查询教职工总数
 */
exports.count = async function() {
    return new Promise((res, rej) => {
        const conn = createConnection(); //创建连接
        conn.connect(); //打开连接

        const sql = 'select count(role_id<>1 and role_id<>2 or null) as val from person';
        conn.query(sql, function(err, results) {    //执行sql语句
            err ? rej(err) : res(results[0].val);
        });

        conn.end(); //关闭连接
    });
}

/**
 * 分页查询教职工
 * page: 页码，从1开始
 * pageSize: 每页显示多少条数据
 */
exports.findByPage = async function(page, pageSize) {
    return new Promise((res, rej) => {
        const conn = createConnection();
        conn.connect();

        const sql = `select
						person.*,
						role_name
					from person, role
					where person.role_id<>1
						and person.role_id<>2
					    and person.role_id=role.role_id
					limit ?,?`;
        const params = [(page - 1) * pageSize, +pageSize]; //为占位符(sql参数)提供数据
        conn.query(sql, params, function(err, results) {
            err ? rej(err) : res(results);
        });

        conn.end();
    });
}

/**
 * 添加教职工
 * teachers: 存放添加教职工信息的数组
 */
exports.addTeachers = async function(teacher) {
    return new Promise((res, rej) => {
        const conn = createConnection();
        conn.connect();

        for (const teach of teacher) {
            //执行sql语句，将teach中的信息加入到数据库
            const sql = 'insert into person(`login_id`,`name`,`password`,`gender`,`phone`,`email`,`dept_id`,`role_id`) values(?,?,?,?,?,?,?)';
            const params = [teach.login_id, teach.name, md5('123456'), teach.gender, teach.phone, teach.email, teach.dept_id, 3];//为占位符(sql参数)提供数据
            conn.query(sql, params, function(err, results) {
                err ? rej(err) : res({msg: '添加成功'});
            }); //执行sql语句
        }

        conn.end();
    });
}

/**
 * 删除教职工
 * teachers: 存放删除教职工的数组
 */
exports.delTeachers = async function(teachers) {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();

        for (const teach of teachers) {
            var sql = 'delete from person where login_id=?';
            conn.query(sql, [teach.login_id], function(err, results) {
                err ? rej(err) : res({msg: '删除成功'});
            }); //执行sql语句
        }

        conn.end();
    });
}

/**
 *查询匹配的教职工总数
 */
exports.searchCount = async function(name) {
    return new Promise((res, rej) => {
        const conn = createConnection(); //创建连接
        conn.connect(); //打开连接

        const sql = 'select count(*) as val from person where role_id<>1 and role_id<>2 and name like ?';
        conn.query(sql, '%' + name + '%', function(err, results) {
            //执行sql语句
            err ? rej(err) : res(results[0].val);
        });

        conn.end(); //关闭连接
    });
}

/**
 * 查询教职工
 * name: 教职工名称
 */
exports.searchTeachers = async function(name, page, pageSize) {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();

        var sql = `select 
                        person.*, role.role_name 
                   from person, role 
                   where person.role_id<>1 
                   and person.role_id<>2 
                   and person.role_id=role.role_id
                   and name like ? 
                   limit ?,?`;
        const params = ['%' + name + '%', (page - 1) * pageSize, pageSize];
        conn.query(sql, params, function(err, results) {
            err ? rej(err) : res(results);
        });
        conn.end();
    });
}

/**
 * 更新教职工
 */
exports.updateTeacher = async function(teacher) {
    return new Promise((res, rej) => {
        var conn = createConnection();
        conn.connect();
        var sql = 'update person set ? where login_id=\'';
        conn.query(sql + teacher.login_id + '\'', teacher,
            function(err, results) {
                err ? rej(err) : res({msg: '更新成功'});
            });
        conn.end();
    });
}

