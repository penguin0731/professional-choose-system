const createConnection = require('../dao/dbutil');

/**
 * 查询所有院系总数
 */
function count() {
	return new Promise((res, rej) => {
		const conn = createConnection(); //创建连接
		conn.connect(); //打开连接

		const sql = 'select count(*) as val from department';
		conn.query(sql, function(err, results) {
			//执行sql语句
			err ? rej(err) : res(results[0].val);
		});

		conn.end(); //关闭连接
	});
}

/**
 * 分页查询院系
 * page: 页码，从1开始
 * pageSize: 每页显示多少条数据
 */
function findByPage(page, pageSize) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = 'select * from department limit ?,?';
		const params = [(page - 1) * pageSize, +pageSize]; //为占位符(sql参数)提供数据
		conn.query(sql, params, function(err, results) {
			err ? rej(err) : res(results);
		});

		conn.end();
	});
}

/**
 * 添加院系
 * department: 存放添加院系信息的对象
 */
function addDepartment(department) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = 'insert into department(`department_name`) values(?)';
		const params = [department.department_name]; //为占位符(sql参数)提供数据
		conn.query(sql, params, function(err, results) {
			err ? rej(err) : res({msg: '添加成功'});
		}); //执行sql语句

		conn.end();
	});
}

/**
 * 查询匹配的院系总数
 */
function searchCount(name) {
	return new Promise((res, rej) => {
		const conn = createConnection(); //创建连接
		conn.connect(); //打开连接

		const sql = 'select count(*) as val from department where department_name like ?';
		conn.query(sql, '%' + name + '%', function(err, results) {
			//执行sql语句
			err ? rej(err) : res(results[0].val);
		});

		conn.end(); //关闭连接
	});
}

/**
 * 查询院系
 */
function searchDepartment(name, page, pageSize) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = 'select * from department where department_name like ? limit ?,?';
		const params = ['%' + name + '%', (page - 1) * pageSize, pageSize];
		conn.query(sql, params, function(err, results) {
			err ? rej(err) : res(results);
		});
		conn.end();
	});
}

/**
 * 更新院系
 */
function updateDepartment(department) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();
		const sql = 'update department set ? where department_id=\'';
		conn.query(sql + department.department_id + '\'', department,
			function(err, results) {
				err ? rej(err) : res({msg: '更新成功'});
			});
		conn.end();
	});
}

module.exports = {
	count,
	findByPage,
	addDepartment,
	searchCount,
	searchDepartment,
	updateDepartment,
};
