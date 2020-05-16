const createConnection = require('../dao/dbutil');

/**
 * 查询专业总数
 */
exports.count = async function() {
    return new Promise((res, rej) => {
        const conn = createConnection(); //创建连接
        conn.connect(); //打开连接

        const sql = 'select count(*) as val from major where delete_flag=1';
        conn.query(sql, function(err, results) {    //执行sql语句
            err ? rej(err) : res(results[0].val);
        });

        conn.end(); //关闭连接
    });
}

/**
 * 分页查询专业
 * page: 页码，从1开始
 * pageSize: 每页显示多少条数据
 */
exports.findByPage = async function(page, pageSize) {
    return new Promise((res, rej) => {
        const conn = createConnection();
        conn.connect();

        const sql = `select 
                        major.*, 
                        department.department_name 
                     from major, department 
                     where major.department_id=department.department_id 
                     and delete_flag=1
                     limit ?,?`;
        const params = [(page - 1) * pageSize, +pageSize]; //为占位符(sql参数)提供数据
        conn.query(sql, params, function(err, results) {
            err ? rej(err) : res(results);
        });

        conn.end();
    });
}

/**
 * 添加专业
 * majors: 存放添加专业信息的数组
 */
exports.addMajors = async function(majors) {
    return new Promise((res, rej) => {
        const conn = createConnection();
        conn.connect();

        for (const maj of majors) {
            //执行sql语句，将maj中的信息加入到数据库
            const sql = 'insert into major(`major_name`,`major_year`,`department_id`,`major_detail`,`create_username`) values(?,?,?,?,?)';
            const params = [maj.major_name, maj.major_year, maj.department_id, maj.major_detail, maj.create_username];//为占位符(sql参数)提供数据
            conn.query(sql, params, function(err, results) {
                err ? rej(err) : res({msg: '添加成功'});
            }); //执行sql语句
        }

        conn.end();
    });
}

/**
 * 删除专业
 * majors: 存放删除专业的数组
 */
exports.delMajors = async function(majors) {
    return new Promise((res, rej) => {
        const conn = createConnection();
        conn.connect();

        for (const maj of majors) {
            const sql = 'update major set delete_flag=0 where major_id=?';
            conn.query(sql, [maj.major_id], function(err, results) {
                err ? rej(err) : res({msg: '删除成功'});
            }); //执行sql语句
        }

        conn.end();
    });
}

/**
 *查询匹配的专业总数
 */
exports.searchCount = async function(name) {
    return new Promise((res, rej) => {
        const conn = createConnection(); //创建连接
        conn.connect(); //打开连接

        const sql = 'select count(*) as val from major where major_name like ?';
        conn.query(sql, '%' + name + '%', function(err, results) {
            //执行sql语句
            err ? rej(err) : res(results[0].val);
        });

        conn.end(); //关闭连接
    });
}

/**
 * 查询专业
 */
exports.searchMajors = async function(major_name, page, pageSize) {
    return new Promise((res, rej) => {
        const conn = createConnection();
        conn.connect();

        const sql = `select
                        major.*, department.department_name 
                     from major, department 
                     where major.department_id=department.department_id
                     and major_name like ?`;
        const params = ['%' + major_name + '%', (page - 1) * pageSize, pageSize];
        conn.query(sql, params, function(err, results) {
            err ? rej(err) : res(results);
        });
        conn.end();
    });
}

/**
 * 更新专业
 */
exports.updateMajor = async function(major) {
    return new Promise((res, rej) => {
        const conn = createConnection();
        conn.connect();

        console.log(major);
        const sql = 'update major set ? where major_id=\'';
        conn.query(sql + major.major_id + '\'', major, function(err, results) {
            err ? rej(err) : res({msg: '更新成功'});
        });

        conn.end();
    });
}

