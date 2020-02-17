//专门处理登录的接口
const express = require('express');
const nodeExcel = require('excel-export');
const router = express.Router(); //得到一个路由对象
const students = require('../service/studentService');
const teachers = require('../service/teacherService');
const majors = require('../service/majorService');

/**
 * 导出学生信息
 * methods: get
 * 请求参数: boolean    true导出空模板    false导出所有学生信息
 */
router.get('/exportStudent', async function (request, response) {
    const isDefault = request.query.isDefault;
    async function readyData() {  //获取数据
        if(Boolean(isDefault == 'default')) {
            return [];
        }else {
            let data = await students.findByPage(1, 9999);
            return data;
        }
    }
    async function exportData(data) {  //导出数据到excel表格
        let conf = {};
        conf.name = 'Sheet1'; //表格名
        //决定列名和类型
        conf.cols = [{
            caption:'学号',
            type:'string'
        },{
            caption:'姓名',
            type:'string'
        },{
            caption:'性别',
            type:'string'
        },{
            caption:'班级',
            type:'string'
        },{
            caption:'联系电话',
            type:'string'
        }, {
            caption:'邮箱',
            type:'string'
        }];
        let allData = new Array();
        for(let i = 0; i < data.length; i++) {
            let arr = new Array();
            arr.push(data[i].login_id);
            arr.push(data[i].name);
            arr.push(data[i].gender == 0 ? '男' : '女');
            arr.push(data[i].classes);
            arr.push(data[i].phone);
            arr.push(data[i].email);
            allData.push(arr);
        }
        conf.rows = allData;//填充数据
        let result = nodeExcel.execute(conf);
        const filename = encodeURI("学生信息");
        response.setHeader('Content-Type', 'application/vnd.openxmlformats;charset=utf-8');
        response.setHeader("Content-Disposition", "attachment; filename=" + filename + ".xlsx");
        response.end(result, 'binary');
    }
    const r = await readyData();
    await exportData(r);
});

/**
 * 导出教职工信息
 * methods: get
 * 请求参数: boolean    true导出空模板    false导出所有教职工信息
 */
router.get('/exportTeacher', async function (request, response) {
    const isDefault = request.query.isDefault;
    async function readyData() {  //获取数据
        if(Boolean(isDefault == 'default')) {
            return [];
        }else {
            let data = await teachers.findByPage(1, 9999);
            return data;
        }
    }
    async function exportData(data) {  //导出数据到excel表格
        let conf = {};
        conf.name = 'Sheet1'; //表格名
        //决定列名和类型
        conf.cols = [{
            caption:'工号',
            type:'string'
        },{
            caption:'姓名',
            type:'string'
        },{
            caption:'性别',
            type:'string'
        },{
            caption:'联系电话',
            type:'string'
        },{
            caption:'邮箱',
            type:'string'
        }];
        let allData = new Array();
        for(let i = 0; i < data.length; i++) {
            let arr = new Array();
            arr.push(data[i].login_id);
            arr.push(data[i].name);
            arr.push(data[i].gender == 0 ? '男' : '女');
            arr.push(data[i].phone);
            arr.push(data[i].email);
            allData.push(arr);
        }
        conf.rows = allData;//填充数据
        let result = nodeExcel.execute(conf);
        const filename = encodeURI("教职工信息");
        response.setHeader('Content-Type', 'application/vnd.openxmlformats;charset=utf-8');
        response.setHeader("Content-Disposition", "attachment; filename=" + filename + ".xlsx");
        response.end(result, 'binary');
    }
    const r = await readyData();
    await exportData(r);
});

/**
 * 导出专业信息
 * methods: get
 * 请求参数: boolean    true导出空模板    false导出所有专业信息
 */
router.get('/exportMajor', async function (request, response) {
    const isDefault = request.query.isDefault;
    async function readyData() {  //获取数据
        if(Boolean(isDefault == 'default')) {
            return [];
        }else {
            let data = await majors.findByPage(1, 9999);
            return data;
        }
    }
    async function exportData(data) {  //导出数据到excel表格
        let conf = {};
        conf.name = 'Sheet1'; //表格名
        //决定列名和类型
        conf.cols = [{
            caption:'专业名称',
            type:'string'
        },{
            caption:'专业学制',
            type:'number'
        },{
            caption:'专业介绍',
            type:'string'
        }];
        let allData = new Array();
        for(let i = 0; i < data.length; i++) {
            let arr = new Array();
            arr.push(data[i].major_name);
            arr.push(data[i].major_year);
            arr.push(data[i].major_detail);
            allData.push(arr);
        }
        conf.rows = allData;//填充数据
        let result = nodeExcel.execute(conf);
        const filename = encodeURI("专业信息");
        response.setHeader('Content-Type', 'application/vnd.openxmlformats;charset=utf-8');
        response.setHeader("Content-Disposition", "attachment; filename=" + filename + ".xlsx");
        response.end(result, 'binary');
    }
    const r = await readyData();
    await exportData(r);
});

module.exports = router;