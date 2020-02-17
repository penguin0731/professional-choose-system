//专门处理选报方向的接口
const express = require('express');
const taskSelectedService = require('../service/taskSelectedService');
const directService = require('../service/directService');
const router = express.Router(); //得到一个路由对象

/**
 * 根据年级和专业查询任务
 * api: /api/taskSelected/findTaskByUser
 * methods: post
 * 请求参数: task   type: object   ex:{grade_id, major_id}
 */
router.post('/findTaskByUser', async function (request, response) {
    const grade_id = request.body.grade_id;
    const major_id = request.body.major_id;
    const login_id = request.body.login_id;
    const results = await Promise.all([taskSelectedService.findTaskByUser(grade_id, major_id), taskSelectedService.findSelectedByUser(login_id)]);
    response.send({
        tasks: results[0],
        selected: results[1]
    });
});

/**
 * 选报方向
 * api: /api/taskSelected/selectedDirect
 * methods: post
 * 请求参数： selectForm   type: object    {task_id, login_id, selected_time, direction_id}
 */
router.post('/selectedDirect', async function(request, response) {
    const selectedForm = request.body;
    let result;
    if(selectedForm.id) {
        result = await taskSelectedService.changeDirect(selectedForm);
    }else {
        result = await taskSelectedService.selectDirect(selectedForm);
    }
    response.send(result);
});

/**
 * 更新方向的已选人数
 * api: /api/taskSelected/updateSelectedNum
 * methods: post
 * 请求参数: directArr    type: array      [{grade_id. major_id}]
 */
router.post('/updateSelectedNum', async function(request, response) {
    const directArr = request.body;
    const length = directArr.length;
    let selectedNumArr = [];
    for(let i = 0; i < length; i++) {
        let result = await taskSelectedService.countSelectedNum(directArr[i]);
        if(!result.direction_id) {
            result.direction_id = directArr[i].direction_id;
        }
        selectedNumArr.push(result);
    }
    const result = await directService.updateDirection(selectedNumArr);
    response.send(result);
});



module.exports = router;