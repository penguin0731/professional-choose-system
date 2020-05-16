//专门处理访问专业的接口
const express = require('express');
const majService = require('../service/majorService');
const router = express.Router(); //得到一个路由对象

//配置路由规则

/**
 * 分页查询专业
 * api: /api/major/findByPage
 * methods: get
 * 请求参数: page        type:number      查询第几页,默认为1
 *          pageSize    type:number      每页展示的数量,默认为10
 */
router.get('/findByPage', async function(request, response) {
    //获取page 和 pageSize
    const page = request.query.page || 1; //默认为1
    const pageSize = request.query.pageSize || 10; //默认为10
    const result = await Promise.all([majService.findByPage(page, pageSize), majService.count()]);
    response.send({
        data: result[0],
        count: result[1],
    });
});

/**
 * 添加专业
 * api: /api/major/addMajors
 * methods: post
 * 请求参数: majors    type:array   ex:[{},{}]   专业数组
 * majors[item]       {major_id: '111',major_name: '软件工程', ...}
 */
router.post('/addMajors', async function(request, response) {
    const majors = request.body.majors;
    const result = await majService.addMajors(majors);
    response.send(result);
});

/**
 * 删除专业
 * api: /api/major/delMajors
 * methods: post
 * 请求参数: majors    array   [{},{}]   专业数组
 * majors[item]       {major_id: xxx}
 */
router.post('/delMajors', async function(request, response) {
    const majors = request.body.majors;
    const result = await majService.delMajors(majors);
    response.send(result);
});

/**
 * 查询专业
 * api: /api/major/searchMajors
 * methods: get
 * 请求参数: major    type:string       专业对象
 */
router.get('/searchMajors', async function(request, response) {
    const name = request.query.name;
    const page = request.query.page || 1; //默认为1
    const pageSize = request.query.pageSize || 10; //默认为10
    const results = await Promise.all([majService.searchMajors(name, page, pageSize), majService.searchCount(name)]);
    response.send({
        data: results[0],
        count: results[1]
    });
});

/**
 * 更新专业
 * api: /api/major/updateMajor
 * methods: post
 * 请求参数: major    type:object    {major_id: 必填}      专业对象
 */
router.post('/updateMajor', async function(request, response) {
    const major = request.body;
    const result = await majService.updateMajor(major);
    response.send(result);
});

module.exports = router;

