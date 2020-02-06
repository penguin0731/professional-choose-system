const createConnection = require('../dao/dbutil');

/**
 * 查询角色总数
 */
function count() {
	return new Promise((res, rej) => {
		const conn = createConnection(); //创建连接
		conn.connect(); //打开连接

		const sql = 'select count(*) as val from role';
		conn.query(sql, function(err, results) {
			//执行sql语句
			err ? rej(err) : res(results[0].val);
		});

		conn.end(); //关闭连接
	});
}

/**
 * 分页查询角色
 * page: 页码，从1开始
 * pageSize: 每页显示多少条数据
 */
function findByPage(page, pageSize) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = 'select * from role limit ?,?';
		const params = [(page - 1) * pageSize, +pageSize]; //为占位符(sql参数)提供数据
		conn.query(sql, params, function(err, results) {
			err ? rej(err) : res(results);
		});

		conn.end();
	});
}

/**
 * 查询教职工角色
 */
function findTeach() {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = 'select * from role where role_id<>1 and role_id<>2'
		conn.query(sql, function (err, results) {
			err ? rej(err) : res(results);
		});

		conn.end();
	});
}

/**
 * 添加角色
 * role: 存放添加院系信息的对象
 */
function addRole(role) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = 'insert into role(`role_name`) values(?)';
		conn.query(sql, role.role_name, function(err, results) {
			err ? rej(err) : res({msg: '添加成功'});
		}); //执行sql语句

		conn.end();
	});
}

/**
 *查询匹配的角色总数
 */
function searchCount(name) {
	return new Promise((res, rej) => {
		const conn = createConnection(); //创建连接
		conn.connect(); //打开连接

		const sql = 'select count(*) as val from role where role_name like ?';
		conn.query(sql, '%' + name + '%', function(err, results) {
			//执行sql语句
			err ? rej(err) : res(results[0].val);
		});

		conn.end(); //关闭连接
	});
}

/**
 * 查询角色
 */
function searchRole(name, page, pageSize) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = 'select * from role where role_name like ? limit ?,?';
		const params = ['%' + name + '%', (page - 1) * pageSize, pageSize];
		conn.query(sql, params, function(err, results) {
			err ? rej(err) : res(results);
		});
		conn.end();
	});
}

/**
 * 更新角色
 */
function updateRole(role) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();
		const sql = 'update role set ? where role_id=\'';
		conn.query(sql + role.role_id + '\'', role, function(err, results) {
			err ? rej(err) : res({msg: '更新成功'});
		});
		conn.end();
	});
}

module.exports = {
	count,
	findByPage,
	findTeach,
	addRole,
	searchCount,
	searchRole,
	updateRole,
};
