var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('login');
});

router.get('/user',function(req,res,next){
    res.render('main/user');
});

router.get('/ad/record',function(req,res,next){
    res.render('admin/record');
});

router.get('/ad/picrecord',function(req,res,next){
    res.render('admin/picRecord');
});

router.get('/ad/userlist',function(req,res,next){
    res.render('admin/userList');
});

router.get('/ad/aplist',function(req,res,next){
    res.render('admin/apList');
});

module.exports = router;