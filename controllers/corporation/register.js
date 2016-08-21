// 模型
var Corporation = require('../../models/corporation.js');

module.exports={
    register: function *() {
        yield this.render('corporation/register', {
            title: '单位注册'
        });
    },
    doRegister: function *() {
        try {
            var corporation = this.request.body;

            if (!corporation.name && !corporation.belong && !corporation.email) {// 单位名称、身份和电子邮箱都为空
                // 重定向到单位注册页面
                this.redirect('/corporation/register/');
            } else {// 单位名称、身份和电子邮箱都不为空
                // 注册信息保存到数据库
                var _corporation = new Corporation(corporation);
                console.log(_corporation);
                // _corporation.save();

                // 重定向到单位注册成功页面
                this.redirect('/corporation/registerSucceed');
            }
        } catch(e) {
            this.body = "注册失败";
            console.log(e);
        }
    },
    registerSucceed: function *() {
        var h = '单位注册成功！';
        var p = '系统管理员审核之后会将审核结果发自您的电子邮箱，请留意！';

        yield this.render('corporation/message', {
            title: '单位注册成功',
            h: h,
            p: p
        });
    }
};