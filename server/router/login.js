//专门处理登录的接口
const express = require('express');
const loginService = require('../service/loginService');
const router = express.Router(); //得到一个路由对象

router.post('/', function (resolve, response) {
    const login_id = resolve.body.login_id;
    loginService.queryUserByLoginId(login_id).then(res => {
        response.send(res);
    })
});

module.exports = router;