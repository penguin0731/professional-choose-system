const createConnection = require('../dao/dbutil');

/**
 * 查询角色总数
 */
exports.count = async function() {
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
exports.findByPage = async function(page, pageSize) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = 'select * from role where role_id<>2 limit ?,?';
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
exports.findTeach = async function() {
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
exports.addRole = async function(role) {
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
exports.searchCount = async function(name) {
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
exports.searchRole = async function(name, page, pageSize) {
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
exports.updateRole = async function(role) {
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

/**
 * 查询系统模块
 */
exports.findModule = async function() {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = 'select * from resource where resource_type <> 0';
		conn.query(sql, function (err, results) {
			err ? rej(err) : res(results);
		})

		conn.end();
	})
}

/**
 * 查询角色已有的权限
 */
exports.findCheckedModule = async function(role_id) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = `select 
						resource.* 
					from 
						resource, role_resource 
					where 
						resource.resource_id=role_resource.resource_id 
						and role_resource.role_id=?`;
		const params = [role_id];
		conn.query(sql, params, function (err, results) {
			err ? rej(err) : res(results);
		})

		conn.end();
	})
}

/**
 * 分配权限
 */
exports.dispatchPower = async function(role_resource) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		for(const rs of role_resource) {
			const sql = 'insert into role_resource(`role_id`, `resource_id`) values(?,?)';
			const params = [rs.role_id, rs.id];
			conn.query(sql, params, function (err, results) {
				err ? rej(err) : res(results);
			});
		}

		conn.end();
	})
}

exports.revokePower = async function (role_resource) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		for(const rs of role_resource) {
			const sql = 'delete from role_resource where role_id=? and resource_id=?';
			const params = [rs.role_id, rs.id];
			conn.query(sql, params, function (err, results) {
				err ? rej(err) : res(results);
			});
		}

		conn.end();
	})
}
