// 引用模块
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

// SMTP Transport 配置
var configSMTP = require('../config/smtp').smtpTransport;

// 定义单位模式
var CorporationSchema = new mongoose.Schema({
    avatar: { type: String, default: '/upload/avatars/avatar.png' },// 头像
    name: { unique: true, type: String },// 名称
    belong: { type: String, default: '社团' },// 身份（社团，部门，团队，商店，公司）
    email: { unique: true, type: String },// 电子邮件
    tel: Number,// 手机号码或电话号码
    url: String,// 网址
    address: String,// 地址
    introduction: String,// 介绍
    state: { type: String, default: '未审核' },// 状态（未审核，通过）
    picture: { type: String, default: '/upload/pictures/picture.png' }// 单位照片
});

// 定义单位实例方法
CorporationSchema.methods = {};
    
// 定义单位静态方法，在 Model 层就能使用
CorporationSchema.statics = {
    // 设置单位状态
    setCorporationState: function* (id, stateValue) {
        yield this.update({'_id': id}, {$set: {'state': stateValue}});
    },
    // 发送邮件通知单位
    sendMail: function* (email, text) {

        // 开启一个 SMTP 连接池
        var transport = nodemailer.createTransport(smtpTransport(configSMTP));

        // 设置邮件内容
        var mailOptions = {
            'from': 'bizhongbio@qq.com',// 发件地址
            'to': email,// 收件列表
            'subject': '校园传单单位注册审核结果',// 标题
            'html': text
        };

        // 发送邮件
        transport.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.error(error);
            } else {
                console.log(response);
            }

            // 如果没用，关闭连接池
            transport.close();
        });
    }
};

// 编译单位模型
var Corporation = mongoose.model('Corporation', CorporationSchema);

// 导出单位模型
module.exports = Corporation;