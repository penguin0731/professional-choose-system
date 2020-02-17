//专门处理访问方向选报任务的接口
const express = require('express');
const professionalTaskService = require('../service/professionalTaskService');
const router = express.Router(); //得到一个路由对象

//配置路由规则

/**
 * 分页查询任务
 * api: /api/task/findByPage
 * methods: get
 * 请求参数: page        type:number      查询第几页,默认为1
 *          pageSize    type:number      每页展示的数量,默认为10
 */
router.get('/findByPage', async function(request, response) {
	//获取page 和 pageSize
	const page = request.query.page || 1; //默认为1
	const pageSize = request.query.pageSize || 10; //默认为10
	const results = await Promise.all([professionalTaskService.findByPage(page, pageSize), professionalTaskService.count()]);
	response.send({
		data: results[0],
		count: results[1],
	});
});

/**
 * 添加任务
 * api: /api/task/addTask
 * methods: post
 * 请求参数: task    type:object   ex:{}  任务对象
 * task          {grade_id: 101,major_id: 111, ...}
 */
router.post('/addTask', async function(request, response) {
	const task = request.body;
	const result = await professionalTaskService.addTask(task);
	response.send(result);
});

/**
 * 删除任务
 * api: /api/task/delTasks
 * methods: post
 * 请求参数: tasks    type:array   ex:[{},{}]   任务数组
 * tasks[item]       {id: xxx}
 */
router.delete('/delTasks', async function(request, response) {
	const tasks = request.body.tasks;
	const result = await professionalTaskService.delTasks(tasks);
	response.send(result);
});

/**
 * 更新任务
 * api: /api/task/updateTask
 * methods: post
 * 请求参数: task   type:object    ex:{id: 必填}      任务对象
 */
router.post('/updateTask', async function(request, response) {
	const tasks = request.body;
	const result = await professionalTaskService.updateTask(tasks);
	response.send(result);
});




module.exports = router;

