// 模型
var Corporation = require('../../models/corporation.js');

module.exports = {
    // 单位注册
    register: function* () {
        yield this.render('corporation/register', {
            'title': '单位注册'
        });
    },
    // 单位注册处理
    doRegister: function* () {
        try {
            var corporation = this.request.body;
            var emailResult = corporation.emailResult;// 电子邮件是否可用
            var usernameResult = corporation.usernameResult;// 用户名是否可用

            if (!corporation.name || !corporation.belong || !corporation.email || emailResult === 'no' || usernameResult === 'no') {// 单位名称、身份和电子邮箱为空，电子邮箱、用户名不可用
                // 重定向到单位注册失败页面
                this.redirect('/corporation/registerFailed/');
            } else {// 单位名称、身份和电子邮箱都不为空
                // 手机号码或电话号码为空，特殊处理
                corporation.tel = corporation.tel || 0;

                // 单位注册信息保存到数据库
                var _corporation = new Corporation(corporation);
                yield _corporation.save();

                // 重定向到单位注册成功页面
                this.redirect('/corporation/registerSucceed/');
            }
        } catch(e) {
            this.body = '单位注册失败';
            console.log(e);
        }
    },
    // 单位注册成功
    registerSucceed: function* () {
        var result = {
            'head': '单位注册成功',
            'paragraph': '系统管理员审核之后会将审核结果发自您填写的电子邮箱，请耐心等待！',
            'continueTitle': '首页',
            'continueURL': '/'
        };

        yield this.render('message', {
            'title': '单位注册成功',
            'result': result
        });
    },
    // 单位注册失败
    registerFailed: function* () {
        var result = {
            'head': '单位注册失败',
            'paragraph': '单位信息输入有错，例如：单位名称、身份和电子邮箱为空，电子邮箱、用户名不可用。请再次输入！',
            'continueTitle': '单位注册',
            'continueURL': '/corporation/register/'
        };

        yield this.render('message', {
            'title': '单位注册失败',
            'result': result
        });
    }
};