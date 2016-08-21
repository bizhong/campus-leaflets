// 模型
var User = require('../../models/user.js');

module.exports={
    login: function *() {
        yield this.render('user/login', {
            title: '登录'
        });
    },
    doLogin: function *() {
        try {
            var user = this.request.body;

            if (!user.emailusername && !user.password) {// 电子邮箱（用户名）和密码都为空
                // 重定向到登录页面
                this.redirect('/login/');
            } else {
                // 验证登录
                User.verifyLogin(user);
            }
        } catch(e) {
            this.body = "注册失败";
            console.log(e);
        }
    }
};