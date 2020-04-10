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
router.get('/findByPage', async function(request, response) {
	//获取page 和 pageSize
	const page = request.query.page || 1; //默认为1
	const pageSize = request.query.pageSize || 10; //默认为10
	const results = await Promise.all([roleService.findByPage(page, pageSize), roleService.count()]);
	response.send({
		data: results[0],
		count: results[1],
	});
});

/**
 * 查询教职工角色
 * api: /api/role/findTeach
 * method: get
 * 无请求参数
 */
router.get('/findTeach', async function (request, response) {
	const results = await roleService.findTeach();
	response.send({
		data: results
	});
})

/**
 * 添加角色
 * api: /api/role/addRole
 * methods: post
 * 请求参数: role    type:object   {}   角色对象
 * role      {role_name: '学生', ...}
 */
router.post('/addRole', async function(request, response) {
	const role = request.body;
	const result = await roleService.addRole(role);
	response.send(result);
});

/**
 * 查询角色
 * api: /api/role/searchRoles
 * methods: get
 * 请求参数: role    type:string       角色名称
 */
router.get('/searchRoles', async function(request, response) {
	const name = request.query.name;
	const page = request.query.page || 1; //默认为1
	const pageSize = request.query.pageSize || 10; //默认为10
	const results = await Promise.all([roleService.searchRole(name, page, pageSize), roleService.searchCount(name)]);
	response.send({
		data: results[0],
		count: results[1]
	});
});

/**
 * 更新角色
 * api: /api/role/updateRole
 * methods: post
 * 请求参数: role    type:object    {role_id: 必填}      角色对象
 */
router.post('/updateRole', async function(request, response) {
	const role = request.body;
	const result = await roleService.updateRole(role);
	response.send(result);
});

/**
 * 查找模块
 * api: /api/role/findModule
 * methods: get
 */
router.get('/findModule', async function (request, response) {
	const result = await roleService.findModule();
	response.send(result);
});

/**
 * 查找角色已有权限的模块
 * api: /api/role/findCheckedModule
 * methods: get
 * 请求参数: role_id
 */
router.get('/findCheckedModule', async function (request, response) {
	const role_id = request.query.role_id;
	const result = await roleService.findCheckedModule(role_id);
	response.send(result);
})

/**
 * 分配权限
 * api: /api/role/dispatchPower
 * methods: post
 * 请求参数:  role_resources  type:array   [{},{}]
 */
router.post('/dispatchPower', async function (request, response) {
	const role_resources = request.body.role_resources;
	let result1, result2;
	if(role_resources[0].length != 0) {
		result1 = await roleService.dispatchPower(role_resources[0]);
	}
	if(role_resources[1].length != 0) {
		result2 = await roleService.revokePower(role_resources[1]);
	}
	response.send({
		msg: '修改成功'
	});
})

module.exports = router;

