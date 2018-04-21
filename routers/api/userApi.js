var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var User = require('../../models/user');

//randomBytes和pbkdf2Sync，前者会生成一个字符串，后者生成密码和salt的哈希值
router.post("/register", function(req, res, next){
    if (!req.body.sname || !req.body.sid || !req.body.pwd || !req.body.sex || !req.body.img) {
        res.json({
            status: 0,
            msg: "请填写完整！"
        });
        return;
    }else {
        User.find({"sid":req.body.sid}).then(function(rs){
            if(rs != ''){
                res.json({
                    status: 0,
                    msg: "该学号已存在！"
                });
                return;
            }else {
                var regno;
                User.find({},{ regno: 1, _id: 0 }).then(function(rs){
                    if(rs != ''){
                        var rslength = Object.keys(rs).length;
                        var max = rs[0].regno;
                        for(var i=0;i<rslength;i++){
                            max = max > rs[i].regno ? max : rs[i].regno;
                        }
                        regno = max + 1;
                    }
                    else {
                        regno = 0;
                    }
                }).then(function(){
                    var salt = crypto.randomBytes(16).toString('hex');
                    var hash = crypto.pbkdf2Sync(req.body.pwd,salt,1000,64,'sha512').toString('hex');
                    new User({
                        sname : req.body.sname,
                        sid : req.body.sid,
                        salt: salt,
                        hash: hash,
                        sex: req.body.sex,
                        img: req.body.img,
                        regno: regno
                    }).save().then(function(){
                        res.json({
                            status: 1,
                            msg: "注册成功！"
                        });
                        return;
                    })
                })
            }
        })
    }
})

//密码验证方法
router.post("/login", function(req, res, next){
    if (!req.body.sid || !req.body.pwd) {
        res.json({
            status: 0,
            msg: "请填写完整！"
        });
        return;
    }else {
        User.findOne({
            sid: req.body.sid
        }).then(function(rs){
            if(rs != ''){
                var hash = crypto.pbkdf2Sync(req.body.pwd,rs.salt,1000,64,'sha512').toString('hex');
                if(hash === rs.hash){
                    var expiry = new Date();
                    expiry.setDate(expiry.getDate() + 7);
                    var token = jwt.sign({
                        sid: rs.sid,
                        refreshtime : Date.getDate,
                        exp: parseInt(expiry.getTime()/1000)
                    }, process.env.JWT_SECRET );
                    User.update({
                        sid: rs.sid
                    },{
                        lasttime : Date.getDate,
                        token : token
                    }).then(function(){
                        var maxAge;
                        if(req.body.rem){
                            maxAge = 1000*60*60*24*7;
                        }else{
                            maxAge = 1000*60*60*1;
                        }
                        res.cookie("GK_value",{"token": token},{maxAge:maxAge});
                        if (req.cookies["GK_value"]){
                            res.locals.GK_value = req.cookies.GK_value.token;
                        }
                        res.json({
                            status: 1,
                            msg: "登录成功！"
                        });
                        return;
                    })
                }else {
                    res.json({
                        status: 0,
                        msg: "账号或密码错误！"
                    });
                    return;
                }
            }else {
                res.json({
                    status: 0,
                    msg: "账号不存在！"
                });
                return;
            }
        })
    }
})

module.exports = router;