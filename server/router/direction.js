//专门处理访问方向的接口
const express = require('express');
const directService = require('../service/directService');
const router = express.Router(); //得到一个路由对象

//配置路由规则

/**
 * 分页查询专业
 * api: /api/direction/findByPage
 * methods: get
 * 请求参数: id          type:number      方向id
 * 			page        type:number      查询第几页,默认为1
 *          pageSize    type:number      每页展示的数量,默认为10
 */
router.get('/findByPage', async function(request, response) {
	const id = request.query.id;
	//获取page 和 pageSize
	const page = request.query.page || 1; //默认为1
	const pageSize = request.query.pageSize || 10; //默认为10
	const results = await Promise.all([directService.findByPage(id, page, pageSize), directService.count(id)]);
	response.send({
		data: results[0],
		count: results[1],
	});
});

/**
 * 添加方向
 * api: /api/direction/addDirection
 * methods: post
 * 请求参数: direction    type:object   ex:{}  方向对象
 * direction      {major_id: '111',grade_id: '111', ...}
 */
router.post('/addDirection', async function(request, response) {
	const direction = request.body.direction;
	const result = await directService.addDirection(direction);
	response.send(result);
});

/**
 * 删除方向
 * api: /api/direction/delDirections
 * methods: post
 * 请求参数: directions    array   [{},{}]   方向数组
 * majors[item]       {major_id: xxx}
 */
router.post('/delDirections', async function(request, response) {
	const directions = request.body.directions;
	const result = await directService.delDirections(directions);
	response.send(result);
});

/**
 * 查询方向
 * api: /api/direction/searchDirections
 * methods: get
 * 请求参数: direction    type:string        方向名称
 */
router.get('/searchDirections', async function(request, response) {
	const id = request.query.major_id;
	const name = request.query.name;
	const page = request.query.page || 1; //默认为1
	const pageSize = request.query.pageSize || 10; //默认为10
	const results = await Promise.all([directService.searchDirections(id, name, page, pageSize), directService.searchCount(id, name)]);
	response.send({
		data: results[0],
		count: results[1]
	});
});

/**
 * 更新方向
 * api: /api/direction/updateDirection
 * methods: post
 * 请求参数: direction    type:object    {id: 必填}      方向对象
 */
router.post('/updateDirection', async function(request, response) {
	const direction = request.body;
	const result = await directService.updateDirection(direction);
	response.send(result);
});

/**
 * 根据年级id和专业id查询方向
 * api: /api/direction/findDirectByUser
 * methods: post
 * 请求参数: user       type:object     {grade_id:xx, major_id:xx}  用户对象
 */
router.post('/findDirectByUser', async function (request, response) {
	const user = request.body;
	const result = await directService.findDirectByUser(user);
	response.send(result);
})

module.exports = router;

