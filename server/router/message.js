//专门处理访问公告的接口
const express = require('express');
const mesService = require('../service/messageService');
const router = express.Router(); //得到一个路由对象

//配置路由规则

/**
 * 分页查询公告
 * api: /api/message/findByPage
 * methods: get
 * 请求参数: page        type:number      查询第几页,默认为1
 *          pageSize    type:number      每页展示的数量,默认为10
 */
router.get('/findByPage', async function(request, response) {
	//获取page 和 pageSize
	const page = request.query.page || 1; //默认为1
	const pageSize = request.query.pageSize || 10; //默认为10
	const results = await Promise.all([mesService.findByPage(page, pageSize), mesService.count()]);
	response.send({
		data: results[0],
		count: results[1],
	});
});

/**
 * 查询公示的公告
 * api: /api/message/findShowMes
 * method: get
 * 请求参数: page        type:number      查询第几页,默认为1
 *          pageSize    type:number      每页展示的数量,默认为10
 */
router.get('/findShowMes', async function (request, response) {
	const page = request.query.page || 1; //默认为1
	const pageSize = request.query.pageSize || 10; //默认为10
	const result = await mesService.findShowMes(page, pageSize);
	response.send({
		data: result
	});
})

/**
 * 添加公告
 * api: /api/message/addMessage
 * methods: post
 * 请求参数: message    type:array   ex:{}  专业数组
 * messages[item]       {id: 1, message_title: '标题', ...}
 */
router.post('/addMessage', async function(request, response) {
	const message = request.body;
	const result = await mesService.addMessages(message);
	response.send(result);
});

/**
 * 查询公告
 * api: /api/message/searchMessages
 * methods: get
 * 请求参数: message    type:string       专业对象
 */
router.get('/searchMajors', async function(request, response) {
	const name = request.query.name;
	const page = request.query.page || 1; //默认为1
	const pageSize = request.query.pageSize || 10; //默认为10
	const results = await Promise.all([mesService.searchMessages(name, page, pageSize), mesService.searchCount(name)]);
	response.send(results);
});

/**
 * 更新公告
 * api: /api/message/updateMessage
 * methods: post
 * 请求参数: message    type:object    {major_id: 必填}      专业对象
 */
router.post('/updateMessage', async function(request, response) {
	const message = request.body;
	const result = await mesService.updateMessage(message);
	response.send(result);
});

module.exports = router;

