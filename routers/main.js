var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('login');
});

router.get('/user',function(req,res,next){
    res.render('main/user');
});

router.get('/record',function(req,res,next){
    res.render('admin/record');
});

router.get('/picrecord',function(req,res,next){
    res.render('admin/picRecord');
});

router.get('/userlist',function(req,res,next){
    res.render('admin/userList');
});

router.get('/aplist',function(req,res,next){
    res.render('admin/apList');
});

module.exports=router;