//专门处理访问教职工的接口
const express = require('express');
const teachService = require('../service/teacherService');
const router = express.Router(); //得到一个路由对象

//配置路由规则

/**
 * 分页查询教职工
 * api: /api/teacher/findByPage
 * methods: get
 * 请求参数: page        type:number      查询第几页,默认为1
 *          pageSize    type:number      每页展示的数量,默认为10
 */
router.get('/findByPage', function(request, response) {
    //获取page 和 pageSize
    const page = request.query.page || 1; //默认为1
    const pageSize = request.query.pageSize || 10; //默认为10
    Promise.all([teachService.findByPage(page, pageSize), teachService.count()])
        .then((res) => {
            response.send({
                data: res[0],
                count: res[1],
            });
        });
});

/**
 * 添加教职工
 * api: /api/teacher/addTeachers
 * methods: post
 * 请求参数: teachers    type:array   [{},{}]   教职工数组
 * teachers[item]       {login_id: '111',name: 'jack', ...}
 */
router.post('/addTeachers', function(request, response) {
    const teachers = request.body.teachers;
    teachService.addTeachers(teachers).then((res) => {
        response.send(res);
    });
});

/**
 * 删除教职工
 * api: /api/teacher/delTeachers
 * methods: post
 * 请求参数: teachers    type:array   [{},{}]   教职工数组
 * teachers[item]       {login_id: xxx}
 */
router.delete('/delTeachers', function(request, response) {
    const teachers = request.body.teachers;
    teachService.delTeachers(teachers).then((res) => {
        response.send(res);
    });
});

/**
 * 查询教职工
 * api: /api/teacher/searchTeachers
 * methods: get
 * 请求参数: teacher    type:string       教职工对象
 */
router.get('/searchTeachers', function(request, response) {
    const name = request.query.name;
    const page = request.query.page || 1; //默认为1
    const pageSize = request.query.pageSize || 10; //默认为10
    Promise.all([teachService.searchTeachers(name, page, pageSize), teachService.searchCount(name)])
        .then((res) => {
            response.send({
                data: res[0],
                count: res[1]
            });
        });
});

/**
 * 更新教职工
 * api: /api/teacher/updateTeacher
 * methods: post
 * 请求参数: teacher    type:object    {login_id: 必填}      教职工对象
 */
router.post('/updateTeacher', function(request, response) {
    const teacher = request.body;
    teachService.updateTeacher(teacher).then((res) => {
        response.send(res);
    });
});

module.exports = router;

