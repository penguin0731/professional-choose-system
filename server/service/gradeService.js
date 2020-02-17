const createConnection = require('../dao/dbutil');

/**
 * 查询年级总数
 */
exports.count = async function() {
	return new Promise((res, rej) => {
		const conn = createConnection(); //创建连接
		conn.connect(); //打开连接

		const sql = 'select count(*) as val from grade';
		conn.query(sql, function(err, results) {
			//执行sql语句
			err ? rej(err) : res(results[0].val);
		});

		conn.end(); //关闭连接
	});
}

/**
 * 分页查询年级
 * page: 页码，从1开始
 * pageSize: 每页显示多少条数据
 */
exports.findByPage = async function(page, pageSize) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = 'select * from grade limit ?,?';
		const params = [(page - 1) * pageSize, +pageSize]; //为占位符(sql参数)提供数据
		conn.query(sql, params, function(err, results) {
			err ? rej(err) : res(results);
		});

		conn.end();
	});
}

/**
 * 添加年级
 * grade: 存放添加年级信息的对象
 */
exports.addGrade = async function(grade) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		//执行sql语句，将stu中的信息加入到数据库
		const sql = 'insert into grade(`grade_name`) values(?)';
		const params = [grade.grade_name]; //为占位符(sql参数)提供数据
		conn.query(sql, params, function(err, results) {
			err ? rej(err) : res({msg: '添加成功'});
		}); //执行sql语句

		conn.end();
	});
}

/**
 * 查询匹配的年级总数
 */
exports.searchCount = async function(name) {
	return new Promise((res, rej) => {
		const conn = createConnection(); //创建连接
		conn.connect(); //打开连接

		const sql = 'select count(*) as val from grade where grade_name like ?';
		conn.query(sql, '%' + name + '%', function(err, results) {
			//执行sql语句
			err ? rej(err) : res(results[0].val);
		});

		conn.end(); //关闭连接
	});
}

/**
 * 查询年级
 */
exports.searchGrade = async function(name, page, pageSize) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = 'select * from grade where grade_name like ? limit ?,?';
		const params = ['%' + name + '%', (page - 1) * pageSize, pageSize];
		conn.query(sql, params, function(err, results) {
			err ? rej(err) : res(results);
		});
		conn.end();
	});
}

/**
 * 更新年级
 */
exports.updateGrade = async function(grade) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();
		const sql = 'update grade set ? where grade_id=\'';
		conn.query(sql + grade.grade_id + '\'', grade,
			function(err, results) {
				err ? rej(err) : res({msg: '更新成功'});
			});
		conn.end();
	});
}

