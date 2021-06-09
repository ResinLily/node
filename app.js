const express = require('express');
const path = require('path');
const session = require('express-session');
const router = require('./router.js');

const app  = express();

//开发资源
app.use('/public/',express.static(path.join(__dirname,'./public/')));
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')));
//请求体
app.use(express.urlencoded({ extended: true }));

app.engine('html',require('express-art-template'));
app.set('views',path.join(__dirname,'./views/'));

//配置session
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true
}))
//挂在路由
app.use(router);







app.listen(8080,function (){

    console.log('服务已启动');
})