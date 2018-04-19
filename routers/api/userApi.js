const express = require('express');
const router = express.Router();
const formidable = require('formidable');
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
        var salt = crypto.randomBytes(16).toString('hex');
        var hash = crypto.pbkdf2Sync(req.body.pwd, this.salt,1000,64).toString('hex');
        new User({
            sname : req.body.sname,
            sid : req.body.sid,
            salt: salt,
            hash: hash,
            sex: req.body.sex,
            img: req.body.img
        }).save().then(function(){
            responseData.code = 1;
            responseData.message = '注册成功';
            res.json({
                status: 1,
                msg: "注册成功！"
            });
            return;
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
                var hash = crypto.pbkdf2Sync(req.body.pwd, rs.salt, 1000, 64).toString('hex');
                if(hash === rs.hash){
                    var expiry = new Date();
                    expiry.setDate(expiry.getDate() + 7);
                    var token = jwt.sign({
                        sid: rs.sid,
                        sname: rs.sname,
                        img: rs.img,
                        exp: parseInt(expiry.getTime()/1000
                    )}, process.env.JWT_SECRET );
                    res.json({
                        status: 1,
                        msg: "登录成功！",
                        token: token
                    });
                    return;
                }else {
                    res.json({
                        status: 0,
                        msg: "账号或密码错误！"
                    })
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