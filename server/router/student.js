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
router.get('/findByPage', function(request, response) {
    //获取page 和 pageSize
    const page = request.query.page || 1; //默认为1
    const pageSize = request.query.pageSize || 10; //默认为10
    Promise.all([stuService.findByPage(page, pageSize), stuService.count()]).
        then((res) => {
            response.send({
                data: res[0],
                count: res[1],
            });
        });
});

/**
 * 添加学生
 * api: /api/student/addStudents
 * methods: post
 * 请求参数: students    type:array   [{},{}]   学生数组
 * students[item]       {login_id: '111',name: 'jack', ...}
 */
router.post('/addStudents', function(request, response) {
    const students = request.body.students;
    stuService.addStudents(students).then((res) => {
        response.send(res);
    });
});

/**
 * 删除学生
 * api: /api/student/delStudents
 * methods: delete
 * 请求参数: students    type:array   [{},{}]   学生数组
 * students[item]       {login_id: xxx}
 */
router.delete('/delStudents', function(request, response) {
    const students = request.body.students;
    stuService.delStudents(students).then((res) => {
        response.send(res);
    });
});

/**
 * 查询学生
 * api: /api/student/searchStudents
 * methods: get
 * 请求参数: name    type:string         学生姓名
 */
router.get('/searchStudents', function(request, response) {
    const name = request.query.name;
    const page = request.query.page || 1; //默认为1
    const pageSize = request.query.pageSize || 10; //默认为10
    Promise.all([stuService.searchStudents(name, page, pageSize), stuService.searchCount(name)])
        .then((res) => {
            response.send({
                data: res[0],
                count: res[1]
            });
        });
});

/**
 * 更新学生
 * api: /api/student/updateStudent
 * methods: post
 * 请求参数: student    type:object    {login_id: 必填}      学生对象
 */
router.post('/updateStudent', function(request, response) {
    const student = request.body;
    stuService.updateStudent(student).then((res) => {
        response.send(res);
    });
});

module.exports = router;

