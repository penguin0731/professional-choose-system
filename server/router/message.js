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
router.get('/findByPage', function(request, response) {
	//获取page 和 pageSize
	const page = request.query.page || 1; //默认为1
	const pageSize = request.query.pageSize || 10; //默认为10
	Promise.all([mesService.findByPage(page, pageSize), mesService.count()]).
		then((res) => {
			response.send({
				data: res[0],
				count: res[1],
			});
		});
});

/**
 * 查询公示的公告
 * api: /api/message/findShowMes
 * method: get
 * 请求参数: page        type:number      查询第几页,默认为1
 *          pageSize    type:number      每页展示的数量,默认为10
 */
router.get('/findShowMes', function (request, response) {
	const page = request.query.page || 1; //默认为1
	const pageSize = request.query.pageSize || 10; //默认为10
	mesService.findShowMes(page, pageSize).then(res => {
		response.send({
			data: res
		})
	})
})

/**
 * 添加公告
 * api: /api/message/addMessage
 * methods: post
 * 请求参数: message    type:array   ex:{}  专业数组
 * messages[item]       {id: 1, message_title: '标题', ...}
 */
router.post('/addMessage', function(request, response) {
	const message = request.body;
	mesService.addMessages(message).then((res) => {
		response.send(res);
	});
});

/**
 * 查询公告
 * api: /api/message/searchMessages
 * methods: get
 * 请求参数: message    type:string       专业对象
 */
router.get('/searchMajors', function(request, response) {
	const name = request.query.name;
	const page = request.query.page || 1; //默认为1
	const pageSize = request.query.pageSize || 10; //默认为10
	Promise.all([mesService.searchMessages(name, page, pageSize), mesService.searchCount(name)])
		.then((res) => {
			response.send(res);
		});
});

/**
 * 更新公告
 * api: /api/message/updateMessage
 * methods: post
 * 请求参数: message    type:object    {major_id: 必填}      专业对象
 */
router.post('/updateMessage', function(request, response) {
	const message = request.body;
	mesService.updateMessage(message).then((res) => {
		response.send(res);
	});
});

module.exports = router;

