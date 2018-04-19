// node 后端服务器
require('dotenv').load();
var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');
var path = require('path');
var swig = require('swig');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var app = express();

var initConfig = require('./config/init');
var port = initConfig.network.port;

//引入接口
var main = require('./routers/main');
var userApi = require('./routers/api/userApi');

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('short', {stream: accessLogStream}));

app.use(cookieParser());
//bodyParser配置
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/static',express.static(path.join(__dirname, './public')));
app.use('/ad/static',express.static(path.join(__dirname, './public')));

//swig配置
app.engine('html',swig.renderFile);
app.set('views','./views');
app.set('view engine','html');
swig.setDefaults({cache:false});

//后端路由
app.use('/', main);
app.use('/api/user', userApi);

//监听端口
try {
    require('./models/db');
    app.listen(port);
    console.log('success listen at port:' + port);
} catch (error) {
    console.log(error);
}