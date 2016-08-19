// 引用模块
var mongoose = require('mongoose');

// 定义单位模式
var CorporationSchema = new mongoose.Schema({
    avatar: {// 头像
        type: String,
        default: ''
    },
    name: {// 名称
        unique: true,
        type: String
    },
    belong: {// 属性（公司，社团，实验室）
        type: String,
        default: '公司'
    },
    email: {// 电子邮件
        unique: true,
        type: String
    },
    tel: Number,// 手机号码或电话号码
    url: String,// 网址
    address: String,// 地址
    introduction: String,// 介绍
    picture: {// 单位照片
        type: String,
        default: ''
    }
});

// 编译单位模型
var Corporation = mongoose.model('Corporation', CorporationSchema);

// 导出单位模型
module.exports = Corporation;