//专门处理访问方向选报任务的接口
const express = require('express');
const professionalTaskService = require('../service/professionalTaskService');
const router = express.Router(); //得到一个路由对象

//配置路由规则

/**
 * 分页查询任务
 * api: /api/professionalTask/findByPage
 * methods: get
 * 请求参数: page        type:number      查询第几页,默认为1
 *          pageSize    type:number      每页展示的数量,默认为10
 */
router.get('/findByPage', function(request, response) {
	//获取page 和 pageSize
	const page = request.query.page || 1; //默认为1
	const pageSize = request.query.pageSize || 10; //默认为10
	Promise.all([professionalTaskService.findByPage(page, pageSize), professionalTaskService.count()]).
		then((res) => {
			response.send({
				data: res[0],
				count: res[1],
			});
		});
});

/**
 * 添加任务
 * api: /api/professionalTask/addTask
 * methods: post
 * 请求参数: task    type:object   ex:{}  任务对象
 * task          {grade_id: 101,major_id: 111, ...}
 */
router.post('/addTask', function(request, response) {
	let data = '';
	request.on('data', function(chunk) {
		data += chunk;
	});
	request.on('end', function() {
		const dataObj = JSON.parse(data);
		professionalTaskService.addTask(dataObj.task).then((res) => {
			response.send(res);
		});
	});
});

/**
 * 删除任务
 * api: /api/professionalTask/delTasks
 * methods: post
 * 请求参数: tasks    type:array   ex:[{},{}]   任务数组
 * tasks[item]       {id: xxx}
 */
router.post('/delTasks', function(request, response) {
	let data = '';
	request.on('data', function(chunk) {
		data += chunk;
	});
	request.on('end', function() {
		const dataObj = JSON.parse(data);
		professionalTaskService.delTasks(dataObj.tasks).then((res) => {
			response.send(res);
		});
	});
});

/**
 * 更新任务
 * api: /api/professionalTask/updateTask
 * methods: post
 * 请求参数: task   type:object    ex:{id: 必填}      任务对象
 */
router.post('/updateTask', function(request, response) {
	let data = '';
	request.on('data', function(chunk) {
		data += chunk;
	});
	request.on('end', function() {
		const task = JSON.parse(data);
		console.log(task);
		professionalTaskService.updateTask(task).then((res) => {
			response.send(res);
		});
	});
});

module.exports = router;

