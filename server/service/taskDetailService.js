const createConnection = require('../dao/dbutil');

/**
 * 查询参与选报任务的人数
 */
exports.count = async function(task_id) {
    return new Promise((res, rej) => {
        const conn = createConnection(); //创建连接
        conn.connect(); //打开连接

        const sql = `select
                        count(person.login_id) as val
                     from
                        choice_task
                     left join person on choice_task.major_id = person.major_id 
                        and choice_task.grade_id = person.grade_id
                     left join task_selected on person.login_id = task_selected.login_id
                     left join direction on direction.direction_id = task_selected.direction_id
                     where choice_task.task_id = 1`;
        const params = [task_id];
        conn.query(sql, params, function(err, results) {    //执行sql语句
            err ? rej(err) : res(results[0].val);
        });

        conn.end(); //关闭连接
    });
}

/**
 * 分页查询选报详情
 * page: 页码，从1开始
 * pageSize: 每页显示多少条数据
 */
exports.findByPage = async function(task_id, page, pageSize) {
    return new Promise((res, rej) => {
        const conn = createConnection();
        conn.connect();

        const sql = `select
                        person.login_id,
                        name,
                        classes,
                        direction_name 
                     from
                        choice_task
                     left join person 
                     on choice_task.major_id = person.major_id 
                        and choice_task.grade_id = person.grade_id
                     left join task_selected 
                     on person.login_id = task_selected.login_id
                     left join direction 
                     on direction.direction_id = task_selected.direction_id
                     where 
                        choice_task.task_id = ?
					 limit ?,?`;
        const params = [task_id, (page - 1) * pageSize, +pageSize]; //为占位符(sql参数)提供数据
        conn.query(sql, params, function(err, results) {
            err ? rej(err) : res(results);
        });

        conn.end();
    });
}