const createConnection = require('../dao/dbutil');

/**
 * 查询公告总数
 */
exports.count = async function() {
	return new Promise((res, rej) => {
		const conn = createConnection(); //创建连接
		conn.connect(); //打开连接

		const sql = 'select count(*) as val from message';
		conn.query(sql, function(err, results) {    //执行sql语句
			err ? rej(err) : res(results[0].val);
		});

		conn.end(); //关闭连接
	});
}

/**
 * 分页查询公告
 * page: 页码，从1开始
 * pageSize: 每页显示多少条数据
 */
exports.findByPage = async function(page, pageSize) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = 'select * from message limit ?,?';
		const params = [(page - 1) * pageSize, +pageSize]; //为占位符(sql参数)提供数据
		conn.query(sql, params, function(err, results) {
			err ? rej(err) : res(results);
		});

		conn.end();
	});
}

/**
 * 查询公示的公告
 */
exports.findShowMes = async function(page, pageSize) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = 'select * from message where message_state=1 limit ?,?';
		const params = [(page - 1) * pageSize, +pageSize]; //为占位符(sql参数)提供数据
		conn.query(sql, params, function(err, results) {
			err ? rej(err) : res(results);
		});

		conn.end();
	});
}

/**
 * 添加公告
 * messages: 存放添加公告信息的数组
 */
exports.addMessages = async function(message) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		//执行sql语句，将mes中的信息加入到数据库
		const sql = 'insert into message(`message_title`,`message_detail`,`release_time`,`message_username`) values(?,?,?,?)';
		const params = [message.message_title, message.message_detail, message.release_time, message.message_username];//为占位符(sql参数)提供数据
		conn.query(sql, params, function(err, results) {
			err ? rej(err) : res({msg: '添加成功'});
		}); //执行sql语句

		conn.end();
	});
}

/**
 *查询匹配的公告总数
 */
exports.searchCount = async function(title) {
	return new Promise((res, rej) => {
		const conn = createConnection(); //创建连接
		conn.connect(); //打开连接

		const sql = 'select count(*) as val from message where message_title like ?';
		conn.query(sql, '%' + title + '%', function(err, results) {
			//执行sql语句
			err ? rej(err) : res(results[0].val);
		});

		conn.end(); //关闭连接
	});
}


/**
 * 查询公告
 */
exports.searchMessages = async function(message_title, page, pageSize) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = 'select * from message where message_title like ? limit ?,?';
		const params = ['%' + message_title + '%', (page - 1) * pageSize, pageSize];
		conn.query(sql, params, function(err, results) {
			err ? rej(err) : res(results);
		});
		conn.end();
	});
}

/**
 * 更新公告
 */
exports.updateMessage = async function(message) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = 'update message set ? where id=\'';
		conn.query(sql + message.id + '\'', message, function(err, results) {
			err ? rej(err) : res({msg: '更新成功'});
		});

		conn.end();
	});
}

