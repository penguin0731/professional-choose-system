//专门处理访问学生的接口
const express = require('express');
const stuService = require('../service/studentService');
const router = express.Router(); //得到一个路由对象

//配置路由规则

/**
 * 分页查询学生
 * api: /api/student/findByPage
 * methods: get
 * 请求参数: page        type:number      查询第几页,默认为1
 *          pageSize    type:number      每页展示的数量,默认为10
 */
router.get('/findByPage', async function(request, response) {
    //获取page 和 pageSize
    const page = request.query.page || 1; //默认为1
    const pageSize = request.query.pageSize || 10; //默认为10
    const results = await Promise.all([stuService.findByPage(page, pageSize), stuService.count()]);
    response.send({
        data: results[0],
        count: results[1]
    });
});

/**
 * 添加学生
 * api: /api/student/addStudents
 * methods: post
 * 请求参数: students    type:array   [{},{}]   学生数组
 * students[item]       {login_id: '111',name: 'jack', ...}
 */
router.post('/addStudents', async function(request, response) {
    const students = request.body.students;
    const result = await stuService.addStudents(students);
    response.send(result);
});

/**
 * 删除学生
 * api: /api/student/delStudents
 * methods: delete
 * 请求参数: students    type:array   [{},{}]   学生数组
 * students[item]       {login_id: xxx}
 */
router.delete('/delStudents', async function(request, response) {
    const students = request.body.students;
    const result = await stuService.delStudents(students);
    response.send(result);
});

/**
 * 查询学生
 * api: /api/student/searchStudents
 * methods: get
 * 请求参数: name    type:string         学生姓名
 */
router.get('/searchStudents', async function(request, response) {
    const name = request.query.name;
    const page = request.query.page || 1; //默认为1
    const pageSize = request.query.pageSize || 10; //默认为10
    const results = await Promise.all([stuService.searchStudents(name, page, pageSize), stuService.searchCount(name)]);
    response.send({
        data: results[0],
        count: results[1]
    });
});

/**
 * 更新学生
 * api: /api/student/updateStudent
 * methods: post
 * 请求参数: student    type:object    {login_id: 必填}      学生对象
 */
router.post('/updateStudent', async function(request, response) {
    const student = request.body;
    const result = await stuService.updateStudent(student);
    response.send(result);
});

module.exports = router;

