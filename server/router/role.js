//专门处理访问角色的接口
const express = require('express');
const roleService = require('../service/roleService');
const router = express.Router(); //得到一个路由对象

//配置路由规则

/**
 * 分页查询角色
 * api: /api/role/findByPage
 * methods: get
 * 请求参数: page        type:number      查询第几页,默认为1
 *          pageSize    type:number      每页展示的数量,默认为10
 */
router.get('/findByPage', function(request, response) {
	//获取page 和 pageSize
	const page = request.query.page || 1; //默认为1
	const pageSize = request.query.pageSize || 10; //默认为10
	Promise.all([roleService.findByPage(page, pageSize), roleService.count()]).
		then((res) => {
			response.send({
				data: res[0],
				count: res[1],
			});
		});
});

/**
 * 查询教职工角色
 * api: /api/role/findTeach
 * method: get
 * 无请求参数
 */
router.get('/findTeach', function (request, response) {
	roleService.findTeach().then(res => {
		response.send({
			data: res
		});
	})
})

/**
 * 添加角色
 * api: /api/role/addRole
 * methods: post
 * 请求参数: role    type:object   {}   角色对象
 * role      {role_name: '学生', ...}
 */
router.post('/addRole', function(request, response) {
	const role = request.body;
	roleService.addRole(role).then((res) => {
		response.send(res);
	});
});

/**
 * 查询角色
 * api: /api/role/searchRoles
 * methods: get
 * 请求参数: role    type:string       角色名称
 */
router.get('/searchRoles', function(request, response) {
	const name = request.query.name;
	const page = request.query.page || 1; //默认为1
	const pageSize = request.query.pageSize || 10; //默认为10
	Promise.all([roleService.searchRole(name, page, pageSize), roleService.searchCount(name)])
		.then((res) => {
			response.send({
				data: res[0],
				count: res[1]
			});
		});
});

/**
 * 更新角色
 * api: /api/role/updateRole
 * methods: post
 * 请求参数: role    type:object    {role_id: 必填}      角色对象
 */
router.post('/updateRole', function(request, response) {
	const role = request.body;
	roleService.updateRole(role).then((res) => {
		response.send(res);
	});
});

module.exports = router;

