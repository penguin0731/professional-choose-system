//专门处理登录的接口
const express = require('express');
const loginService = require('../service/loginService');
const router = express.Router(); //得到一个路由对象

router.post('/', async function (request, response) {
    const login_id = request.body.login_id;
    const result = await loginService.queryUserByLoginId(login_id);
    response.send(result);
});

router.post('/queryUser', async function (request, response) {
    const login_id = request.body.login_id;
    const role_id = request.body.role_id;
    const result = await loginService.queryLoginUser(login_id, role_id);
    response.send(result);
});

router.post('/changePwd', async function (request, response) {
    const person = request.body;
    const result = await loginService.changePwd(person);
    response.send(result);
});

module.exports = router;