const createConnection = require('../dao/dbutil');
const md5 = require('md5');

/**
 * 查询学生总数
 */
function count() {
	return new Promise((res, rej) => {
		const conn = createConnection(); //创建连接
		conn.connect(); //打开连接

		const sql = 'select count(role_id = 1 or null) as val from person';
		conn.query(sql, function(err, results) {
			err ? rej(err) : res(results[0].val);
		});

		conn.end(); //关闭连接
	});
}

/**
 * 分页查询学生
 * page: 页码，从1开始
 * pageSize: 每页显示多少条数据
 */
function findByPage(page, pageSize) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = `select
						person.*,
						grade.grade_name,
						major.major_name
					from person, grade, major
					where person.grade_id=grade.grade_id
						and person.major_id=major.major_id
						and role_id=1
					limit ?,?`;
		const params = [(page - 1) * pageSize, +pageSize]; //为占位符(sql参数)提供数据
		conn.query(sql, params, function(err, results) {
			err ? rej(err) : res(results);
		});

		conn.end();
	});
}

/**
 * 添加学生
 * students: 存放添加学生信息的数组
 */
function addStudents(students) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		for (const stu of students) {
			//执行sql语句，将stu中的信息加入到数据库
			const sql = 'insert into person(`login_id`,`name`,`password`,`gender`,`phone`,`email`,`major_id`,`grade_id`,`classes`,`role_id`,`student_status`) values(?,?,?,?,?,?,?,?,?,?,?)';
			const params = [stu.login_id, stu.name, md5(123456), stu.gender, stu.phone, stu.email, stu.major_id, stu.grade_id, stu.classes, 1, 1]; //为占位符(sql参数)提供数据
				conn.query(sql, params, function(err, results) {
				err ? rej(err) : res({msg: '添加成功'});
			}); //执行sql语句
		}

		conn.end();
	});
}

/**
 * 删除学生
 * students: 存放删除学生的数组
 */
function delStudents(students) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		for (const stu of students) {
			const sql = 'delete from person where login_id=?';
			conn.query(sql, [stu.login_id], function(err, results) {
				err ? rej(err) : res({msg: '删除成功'});
			}); //执行sql语句
		}

		conn.end();
	});
}

/**
 *查询匹配的学生总数
 */
function searchCount(name) {
	return new Promise((res, rej) => {
		const conn = createConnection(); //创建连接
		conn.connect(); //打开连接

		const sql = 'select count(*) as val from person where role_id=1 and name like ?';
		conn.query(sql, '%' + name + '%', function(err, results) {
			//执行sql语句
			err ? rej(err) : res(results[0].val);
		});

		conn.end(); //关闭连接
	});
}

/**
 * 查询学生
 */
function searchStudents(name, page, pageSize) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = 'select * from person where role_id=1 and name like ? limit ?,?';
		const params = ['%' + name + '%', (page - 1) * pageSize, pageSize];
		conn.query(sql, params, function(err, results) {
			err ? rej(err) : res(results);
		});
		conn.end();
	});
}

/**
 * 更新学生
 */
function updateStudent(student) {
	return new Promise((res, rej) => {
		const conn = createConnection();
		conn.connect();

		const sql = 'update person set ? where login_id=\'';
		conn.query(sql + student.login_id + '\'', student,
			function(err, results) {
				err ? rej(err) : res({msg: '更新成功'});
			});

		conn.end();
	});
}

module.exports = {
	count,
	findByPage,
	addStudents,
	delStudents,
	searchCount,
	searchStudents,
	updateStudent,
};
