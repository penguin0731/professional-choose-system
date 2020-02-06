//专门处理访问方向的接口
const express = require('express');
const directService = require('../service/directService');
const router = express.Router(); //得到一个路由对象

//配置路由规则

/**
 * 分页查询专业
 * api: /api/direction/findByPage
 * methods: get
 * 请求参数: page        type:number      查询第几页,默认为1
 *          pageSize    type:number      每页展示的数量,默认为10
 */


router.get('/findByPage', function(request, response) {
	const id = request.query.id;
	//获取page 和 pageSize
	const page = request.query.page || 1; //默认为1
	const pageSize = request.query.pageSize || 10; //默认为10
	Promise.all([directService.findByPage(id, page, pageSize), directService.count(id)]).
		then((res) => {
			response.send({
				data: res[0],
				count: res[1],
			});
		});
});

/**
 * 添加方向
 * api: /api/direction/addDirection
 * methods: post
 * 请求参数: direction    type:object   ex:{}  方向对象
 * direction      {major_id: '111',grade_id: '111', ...}
 */
router.post('/addDirection', function(request, response) {
	const direction = request.body;
	directService.addDirection(direction).then((res) => {
		response.send(res);
	});
});

/**
 * 删除方向
 * api: /api/direction/delDirections
 * methods: post
 * 请求参数: directions    array   [{},{}]   方向数组
 * majors[item]       {major_id: xxx}
 */
router.delete('/delDirections', function(request, response) {
	const directions = request.body.directions;
	directService.delDirections(directions).then((res) => {
		response.send(res);
	});
});

/**
 * 查询方向
 * api: /api/direction/searchDirections
 * methods: get
 * 请求参数: direction    type:string        方向名称
 */
router.get('/searchDirections', function(request, response) {
	const id = request.query.major_id;
	const name = request.query.name;
	const page = request.query.page || 1; //默认为1
	const pageSize = request.query.pageSize || 10; //默认为10
	Promise.all([directService.searchDirections(id, name, page, pageSize), directService.searchCount(id, name)])
	.then((res) => {
		response.send({
			data: res[0],
			count: res[1]
		});
	});
});

/**
 * 更新方向
 * api: /api/direction/updateDirection
 * methods: post
 * 请求参数: direction    type:object    {id: 必填}      方向对象
 */
router.post('/updateDirection', function(request, response) {
	const direction = request.body;
	directService.updateDirection(direction).then((res) => {
		response.send(res);
	});
});

module.exports = router;

