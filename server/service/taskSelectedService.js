const createConnection = require('../dao/dbutil');

/**
 * 根据年级和专业查询任务
 */
exports.findTaskByUser = async function(grade_id, major_id) {
    return new Promise((res, rej) => {
        const conn = createConnection();
        conn.connect();

        const sql = `select * from choice_task where grade_id=? and major_id=?`;
        const params = [grade_id, major_id];
        conn.query(sql, params, function (err, results) {
            err ? rej(err) : res(results);
        })

        conn.end();
    })
}

/**
 * 查询选报方向
 */
exports.findSelectedByUser = async function(login_id) {
    return new Promise((res, rej) => {
        const conn = createConnection();
        conn.connect();

        const sql = `select 
						task_selected.*,
						direction.direction_name
					from 
						task_selected,
						direction
					where 
						task_selected.direction_id = direction.direction_id 
						and task_selected.login_id=?`;
        const params = [login_id];
        conn.query(sql, params, function (err, results) {
            err ? rej(err) : res(results);
        })

        conn.end();
    })
}

/**
 * 选报方向
 */
exports.selectDirect = async function(selectForm) {
    return new Promise((res, rej) => {
        const conn = createConnection();
        conn.connect();

        const sql = `insert into task_selected(task_id, login_id, selected_time, direction_id) value(?,?,?,?)`;
        const params = [selectForm.task_id, selectForm.login_id, selectForm.selected_time, selectForm.direction_id];
        conn.query(sql, params, function (err, results) {
            err ? rej(err) : res({msg: '选报成功'});
        });

        conn.end();
    })
}

/**
 * 修改选报的方向
 */
exports.changeDirect = async function(selectForm) {
    return new Promise((res, rej) => {
        const conn = createConnection();
        conn.connect();

        const sql = `update task_selected set ? where id='`;
        conn.query(sql + selectForm.id + `'`, selectForm, function (err, results) {
            err ? rej(err) : res({msg: '修改成功'});
        })

        conn.end();
    });
}

/**
 * 根据方向id查询已选人数
 */
exports.countSelectedNum = async function(direct) {
    return new Promise((res, rej) => {
        const conn = createConnection();
        conn.connect();

        const sql = `select 
                          direction_id, 
                            count(direction_id) as selected_num 
                          from 
                            task_selected 
                          where 
                            direction_id=?`;
        const params = [direct.direction_id];
        conn.query(sql, params, function (err, result) {
            err ? rej(err) : res(result[0]);
        });

        conn.end();
    });
}