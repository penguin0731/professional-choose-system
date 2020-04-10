//专门处理访问任务详情的接口
const express = require('express');
const taskDetailService = require('../service/taskDetailService');
const router = express.Router(); //得到一个路由对象

/**
 * 分页查询专业
 * api: /api/taskDetail/findByPage
 * methods: get
 * 请求参数: task_id     type:number      任务id
 *          page        type:number      查询第几页,默认为1
 *          pageSize    type:number      每页展示的数量,默认为10
 */
router.get('/findByPage', async function(request, response) {
    const task_id = request.query.task_id;
    //获取page 和 pageSize
    const page = request.query.page || 1; //默认为1
    const pageSize = request.query.pageSize || 10; //默认为10
    const results = await Promise.all([taskDetailService.findByPage(task_id, page, pageSize), taskDetailService.count(task_id)]);
    response.send({
        data: results[0],
        count: results[1],
    });
});


module.exports = router;