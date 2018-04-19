var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost:27017/node_gkapi';
mongoose.connect(dbURI);

// 连接事件
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});