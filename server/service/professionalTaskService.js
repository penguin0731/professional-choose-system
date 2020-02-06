const createConnection = require('../dao/dbutil');

/**
 * 查询任务总数
 */
function count() {
	return new Promise((res, rej) => {
		const conn = createConnection(); //创建连接
		conn.connect(); //打开连接

		const sql = 'select count(*) as val from choice_task where delete_flag=1';
		conn.query(sql, function(err, results) {    //执行sql语句
			err ? rej(err) : res(results[0].val);
		});

		conn.end(); //关闭连接
	});
}

/**
 * 分页查询任务
 * page: 页码，从1开始
 * pageSize: 每页显示多少条数据
 */
function findByPage(page, pageSize) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = 'select * from choice_task where delete_flag=1 limit ?,?';
		const params = [(page - 1) * pageSize, +pageSize]; //为占位符(sql参数)提供数据
		conn.query(sql, params, function(err, results) {
			err ? rej(err) : res(results);
		});

		conn.end();
	});
}

/**
 * 添加任务
 * task: 存放添加任务信息的对象
 */
function addTask(task) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = 'insert into choice_task(`grade_id`,`major_id`,`start_time`,`end_time`,`create_time`,`update_time`,`create_username`) values(?,?,?,?,?,?,?)';
		const params = [task.grade_id, task.major_id, task.start_time, task.end_time, task.create_time, task.update_time, task.create_username];//为占位符(sql参数)提供数据
		conn.query(sql, params, function(err, results) {
			err ? rej(err) : res({msg: '添加成功'});
		}); //执行sql语句

		conn.end();
	});
}

/**
 * 删除任务
 * tasks: 存放删除专业的数组
 */
function delTasks(tasks) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		for (const t of tasks) {
			const sql = 'update choice_task set delete_flag=0 where id=?';
			conn.query(sql, [t.id], function(err, results) {
				err ? rej(err) : res({msg: '删除成功'});
			}); //执行sql语句
		}

		conn.end();
	});
}

/**
 * 更新任务
 */
function updateTask(task) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();
		const sql = 'update choice_task set ? where id=\'';
		conn.query(sql + task.id + '\'', task, function(err, results) {
			err ? rej(err) : res({msg: '更新成功'});
		});
		conn.end();
	});
}

module.exports = {
	count,
	findByPage,
	addTask,
	delTasks,
	updateTask,
};
