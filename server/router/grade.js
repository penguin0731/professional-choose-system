//专门处理访问年级的接口
const express = require('express');
const gradeService = require('../service/gradeService');
const router = express.Router(); //得到一个路由对象

//配置路由规则

/**
 * 分页查询年级
 * api: /api/grade/findByPage
 * methods: get
 * 请求参数: page        type:number      查询第几页,默认为1
 *          pageSize    type:number      每页展示的数量,默认为10
 */
router.get('/findByPage', async function(request, response) {
	//获取page 和 pageSize
	const page = request.query.page || 1; //默认为1
	const pageSize = request.query.pageSize || 10; //默认为10
	const results = await Promise.all([gradeService.findByPage(page, pageSize), gradeService.count()]);
	response.send({
		data: results[0],
		count: results[1],
	});
});

/**
 * 添加年级
 * api: /api/grade/addGrade
 * methods: post
 * 请求参数: students    type:object   {}   年级对象
 * grade      {grade_name: '2016级', ...}
 */
router.post('/addGrade', async function(request, response) {
	const grade = request.body;
	const result = await gradeService.addGrade(grade);
	response.send(result);
});

/**
 * 查询年级
 * api: /api/grade/searchGrades
 * methods: get
 * 请求参数: grade    type:string     年级名称
 */
router.get('/searchGrades', async function(request, response) {
	const name = request.query.name;
	const page = request.query.page || 1; //默认为1
	const pageSize = request.query.pageSize || 10; //默认为10
	const results = await Promise.all([gradeService.searchGrade(name, page, pageSize), gradeService.searchCount(name)]);
	response.send({
		data: results[0],
		count: results[1]
	});
});

/**
 * 更新年级
 * api: /api/grade/updateGrade
 * methods: post
 * 请求参数: grade    type:object    {grade_id: 必填}      年级对象
 */
router.post('/updateGrade', async function(request, response) {
	const grade = request.body;
	const result = await gradeService.updateGrade(grade);
	response.send(result);
});

module.exports = router;

