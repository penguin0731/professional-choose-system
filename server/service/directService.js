const createConnection = require('../dao/dbutil');

/**
 * 查询方向总数
 */
exports.count = async function(id) {
	return new Promise((res, rej) => {
		const conn = createConnection(); //创建连接
		conn.connect(); //打开连接

		const sql = 'select count(*) as val from direction where major_id=? and delete_flag=1';
		conn.query(sql, id, function(err, results) {    //执行sql语句
			err ? rej(err) : res(results[0].val);
		});

		conn.end(); //关闭连接
	});
}

/**
 * 分页查询方向
 * page: 页码，从1开始
 * pageSize: 每页显示多少条数据
 */
exports.findByPage = async function(id, page, pageSize) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = `select 
						direction.*,
						grade.grade_name
					from direction, grade
					where major_id=? 
					and direction.grade_id=grade.grade_id
					and delete_flag=1
					limit ?,?`;
		const params = [id, (page - 1) * pageSize, +pageSize]; //为占位符(sql参数)提供数据
		conn.query(sql, params, function(err, results) {
			err ? rej(err) : res(results);
		});

		conn.end();
	});
}

/**
 * 添加方向
 */
exports.addDirection = async function(direction) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		//执行sql语句，将maj中的信息加入到数据库
		const sql = 'insert into direction(`direction_name`,`direction_detail`,`grade_id`,`major_id`,`create_time`,`limit_num`,`operation_username`) values(?,?,?,?,?,?,?)';
		const params = [direction.direction_name, direction.direction_detail, direction.grade_id, direction.major_id, direction.create_time, direction.limit_num, direction.operation_username];//为占位符(sql参数)提供数据
		conn.query(sql, params, function(err, results) {
			err ? rej(err) : res({msg: '添加成功'});
		}); //执行sql语句

		conn.end();
	});
}

/**
 * 删除方向
 * directions: 存放删除方向的数组
 */
exports.delDirections = async function(directions) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		for (const dir of directions) {
			const sql = 'update direction set delete_flag=0 where direction_id=?';
			conn.query(sql, [dir.direction_id], function(err, results) {
				err ? rej(err) : res({msg: '删除成功'});
			}); //执行sql语句
		}

		conn.end();
	});
}

/**
 *查询匹配的方向总数
 */
exports.searchCount = async function(id, name) {
	return new Promise((res, rej) => {
		const conn = createConnection(); //创建连接
		conn.connect(); //打开连接

		const sql = 'select count(*) as val from direction where major_id=? and name like ? and delete_flag=1';
		const params = [id, '%' + name + '%'];
		conn.query(sql, params, function(err, results) {
			//执行sql语句
			err ? rej(err) : res(results[0].val);
		});

		conn.end(); //关闭连接
	});
}

/**
 * 查询方向
 */
exports.searchDirections = async function(id, name, page, pageSize) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = 'select * from direction where delete_flag=1 and major_id=? and direction_name like ? limit ?,?';
		const params = [id, '%' + name + '%', (page - 1) * pageSize, +pageSize];
		conn.query(sql, params, function(err, results) {
			err ? rej(err) : res(results);
		});

		conn.end();
	});
}

/**
 * 更新方向
 */
exports.updateDirection = async function(direction) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();


		if(direction.constructor == Object) {
			const sql = 'update direction set ? where direction_id=\'';
			conn.query(sql + direction.direction_id + '\'', direction, function(err, results) {
				err ? rej(err) : res({msg: '更新成功'});
			});
		}else if(direction.constructor == Array) { //批量更新选报人数
			for(const direct of direction) {
				const sql = 'update direction set ? where direction_id=\'';
				conn.query(sql + direct.direction_id + '\'', direct, function(err, results) {
					err ? rej(err) : res({msg: '更新成功'});
				});
			}
		}

		conn.end();
	});
}

/**
 * 根据年级专业查询方向
 */
exports.findDirectByUser = async function(user) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = `select * from direction where grade_id=? and major_id=? and delete_flag=1`;
		const params = [user.grade_id, user.major_id];
		conn.query(sql, params, function (err, results) {
			err ? rej(err) : res(results);
		})

		conn.end();
	});
}



