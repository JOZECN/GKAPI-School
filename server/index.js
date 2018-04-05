// node 后端服务器
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const swig=require('swig');
const app = express();
const port = 3000;

//引入api接口
const main = require('../routers/main');
const userApi = require('../routers/api/userApi');

//bodyParser配置
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use('/static',express.static(path.join(__dirname, '../public')));

//swig配置
app.engine('html',swig.renderFile);
app.set('views','../views');
app.set('view engine','html');
swig.setDefaults({cache:false});

// 后端路由
app.use('/', main);
app.use('/api/user', userApi);

// 监听端口
try {
    app.listen(port);
    console.log('success listen at port:' + port);
} catch (error) {
    console.log(error);
}