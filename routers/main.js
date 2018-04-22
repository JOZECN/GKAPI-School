var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');

router.get('/',function(req,res,next){
    res.render('login');
});

router.get('/user/:sid',function(req,res,next){
    if(req.cookies.GK_value){
        var token = req.cookies.GK_value.token;
        if(req.params.sid != ''){
            User.findOne({sid: req.params.sid},{_id: 0,hash: 0,salt: 0,level: 0,update: 0,__v: 0}).then(function(rs){
                if(rs){
                    if(rs.token === token){
                        res.render('main/user',rs);
                    }else{
                        res.render('main/404');
                    }
                }else{
                    res.render('main/404');
                }
            })
        }else {
            res.render('main/404');
        }
    }else{
        res.render('login');
    }
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