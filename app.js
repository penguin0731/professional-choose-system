const express = require('express');
const api = require('./server/api');

const app = express();

app.use(express.json()); //解析json格式的Body
app.use(express.urlencoded({extended: false})); //解析urlencoded格式的Body
// 以下两行代码是解决服务端单页面应用history模式的问题
// const history = require('connect-history-api-fallback');
// app.use(history());


app.use(express.static('public'));

api(app);

app.listen(12306, () => {
  console.log("express is listening in 12306");
});
