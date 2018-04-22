var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var User = require('../../models/user');

//randomBytes和pbkdf2Sync，前者会生成一个字符串，后者生成密码和salt的哈希值
router.post("/register", function(req, res, next){
    if (!req.body.sname || !req.body.sid || !req.body.pwd || !req.body.sex || !req.body.card || !req.body.img) {
        return res.json({
            status: 0,
            msg: "请填写完整！"
        })
    }else {
        User.find({"sid":req.body.sid}).then(function(rs){
            if(rs != ''){
                return res.json({
                    status: 0,
                    msg: "该学号已存在！"
                })
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
                        return res.json({
                            status: 1,
                            msg: "注册成功！"
                        })
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
                        refreshtime: Date.now(),
                        rem: req.body.rem,
                        exp: parseInt(expiry.getTime()/1000)
                    }, process.env.JWT_SECRET );
                    User.update({
                        sid: rs.sid
                    },{
                        lasttime : Date.now(),
                        token : token
                    }).then(function(){
                        var maxAge;
                        if(req.body.rem){
                            maxAge = 1000*60*60*24*7;
                        }else{
                            maxAge = 1000*60*15;
                        }
                        res.cookie("GK_value",{"token": token},{maxAge:maxAge});
                        if (req.cookies["GK_value"]){
                            res.locals.GK_value = req.cookies.GK_value.token;
                        }
                        return res.json({
                            status: 1,
                            msg: "登录成功！"
                        })
                    })
                }else {
                    return res.json({
                        status: 0,
                        msg: "账号或密码错误！"
                    })
                }
            }else {
                return res.json({
                    status: 0,
                    msg: "账号不存在！"
                })
            }
        })
    }
})

//token验证和解析
router.post("/authenticate", function(req, res, next){
    if(req.cookies.GK_value == undefined){
        return res.json({
            status: 0,
            msg: "请先登录！"
        })
    }else {
        var token = req.cookies.GK_value.token;
        if(token){
            jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
                if(err){
                    return res.json({
                        status: 0,
                        msg: "请先登录！"
                    })
                }else {
                    return res.json({
                        status: 1,
                        sid: decoded.sid
                    })
                }
            })
        }else {
            return res.json({
                status: 0,
                msg: "请先登录！"
            })
        }
    }
})

router.post("/logout",function(req, res, next){
    var sid = req.body.sid;
    User.findOne({ sid: sid }).then(function(rs){
        if(rs != ''){
            User.update({
                sid: sid
            },{
                token : ''
            }).then(function(){
                res.clearCookie('GK_value');
                return res.json({
                    status: 1,
                    msg: "已注销！"
                })
            })
        }else {
            return res.json({
                status: 0,
                msg: "账号不存在"
            })
        }
    })
})



module.exports = router;