//专门处理访问院系的接口
const express = require('express');
const deptService = require('../service/departmentService');
const router = express.Router(); //得到一个路由对象

//配置路由规则

/**
 * 分页查询院系
 * api: /api/department/findByPage
 * methods: get
 * 请求参数: page        type:number      查询第几页,默认为1
 *          pageSize    type:number      每页展示的数量,默认为10
 */
router.get('/findByPage', async function(request, response) {
	//获取page 和 pageSize
	const page = request.query.page || 1; //默认为1
	const pageSize = request.query.pageSize || 10; //默认为10
	const results = await Promise.all([deptService.findByPage(page, pageSize), deptService.count()]);
	response.send({
		data: results[0],
		count: results[1],
	});
});

/**
 * 添加院系
 * api: /api/department/addDepartment
 * methods: post
 * 请求参数: department    type:object   {}   院系对象
 * department      {department_name: '计算机学院'}
 */
router.post('/addDepartment', async function(request, response) {
	const department = request.body;
	const result = await deptService.addDepartment(department);
	response.send(result);
});

/**
 * 查询院系
 * api: /api/department/searchDepartments
 * methods: get
 * 请求参数: department    type:string       院系对象
 */
router.get('/searchDepartments', async function(request, response) {
	const name = request.query.name;
	const page = request.query.page || 1; //默认为1
	const pageSize = request.query.pageSize || 10; //默认为10
	const results = await Promise.all([deptService.searchDepartment(name, page, pageSize), deptService.searchCount(name)]);
	response.send({
		data: results[0],
		count: results[1]
	});
});

/**
 * 更新院系
 * api: /api/department/updateDepartment
 * methods: post
 * 请求参数: department    type:object    {grade_id: 必填}      院系对象
 */
router.post('/updateDepartment', async function(request, response) {
	const department = request.body;
	const result = await deptService.updateDepartment(department);
	response.send(result);
});

module.exports = router;

