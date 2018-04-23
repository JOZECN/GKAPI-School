var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var formidable = require('formidable');

router.post("/uploadui", function(req, res, next){
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编码
    form.keepExtensions = true; //保留后缀
    form.maxFields = 1000; //设置最大可接收字段数，用于防止内存溢出，默认值为1000
    form.hash = false; //是否对上传文件进行hash较验，可设置为'sha1' 或 'md5'
    form.maxFieldsSize = 1024 * 60;
    form.on('progress', function(bytesReceived, bytesExpected) {
        if(bytesExpected > 1024 * 60){
            return res.json({
                status: 0,
                msg: "头像文件过大！"
            })
        }
    })
    form.parse(req, function (err, fields, files) {
        if(err) {
            return res.json({
                status: 0,
                msg: "未知错误："+err
            })
        }else{
            var filePath = files.file.path;
            //文件上传的目录文件夹，不存在时创建目标文件夹
            var targetDir = path.join(__dirname, '/../../public/upload/img/user');
            if (!fs.existsSync(targetDir)) {
                fs.mkdir(targetDir);
            }
            var fileExt = filePath.substring(filePath.lastIndexOf('.'));

            //判断文件类型是否允许上传
            if (('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase()) === -1) {
                res.json({
                    status: 0,
                    msg: '此文件类型不允许上传！'
                })
            } else {
                //对上传文件进行重命名
                var fileName = 'avatar_' + new Date().getTime() + fileExt;
                var targetFile = path.join(targetDir, fileName);
                //移动文件
                fs.rename(filePath, targetFile, function (err) {
                    if (err) {
                        res.json({
                            status: 0,
                            msg: "未知错误："+err
                        });
                    } else {
                        //上传成功，返回文件的相对路径
                        var fileUrl = '/static/upload/img/user/' + fileName;
                        res.json({
                            status: 1,
                            url: fileUrl
                        })
                    }
                })
            }
        }
    })
})

router.post("/uploadufp", function(req, res, next){
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.maxFields = 1000;
    form.hash = false;
    form.maxFieldsSize = 1024 * 60;
    form.on('progress', function(bytesReceived, bytesExpected) {
        if(bytesExpected > 1024 * 60){
            return res.json({
                status: 0,
                msg: ".dat文件过大！"
            })
        }
    })
    form.parse(req, function (err, fields, files) {
        if(err) {
            return res.json({
                status: 0,
                msg: "未知错误："+err
            })
        }else{
            var filePath = files.file.path;
            //文件上传的目录文件夹，不存在时创建目标文件夹
            var targetDir = path.join(__dirname, '/../../public/upload/img/fprint');
            if (!fs.existsSync(targetDir)) {
                fs.mkdir(targetDir);
            }
            var fileExt = filePath.substring(filePath.lastIndexOf('.'));

            //判断文件类型是否允许上传
            if (('.dat').indexOf(fileExt.toLowerCase()) === -1) {
                res.json({
                    status: 0,
                    msg: '此文件类型不允许上传！'
                })
            } else {
                //对上传文件进行重命名
                var fileName = 'fp_' + new Date().getTime() + fileExt;
                var targetFile = path.join(targetDir, fileName);
                //移动文件
                fs.rename(filePath, targetFile, function (err) {
                    if (err) {
                        res.json({
                            status: 0,
                            msg: "未知错误："+err
                        });
                    } else {
                        //上传成功，返回文件的相对路径
                        var fileUrl = '/static/upload/img/fprint/' + fileName;
                        res.json({
                            status: 1,
                            url: fileUrl
                        })
                    }
                })
            }
        }
    })
})

module.exports = router;