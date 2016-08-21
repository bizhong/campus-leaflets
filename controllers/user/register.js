// 模型
var User = require('../../models/user.js');

module.exports={
    register: function *() {
        yield this.render('user/register', {
            title: '学生注册'
        });
    },
    doRegister: function *() {
        try {
            var user = this.request.body;
            if (!user.email && !user.username && !user.password) {// 电子邮箱、用户名和密码都为空
                // 重定向到学生注册页面
                this.redirect('/register/');
            } else {// 电子邮箱、用户名和密码都不为空
                // 密码加密
                user.password = User.passwordEncrypt(user.password);

                // 注册信息保存到数据库
                var _user = new User(user);
                _user.save();

                // 重定向到首页
                this.redirect('/');
            }
        } catch(e) {
            this.body = "注册失败";
            console.log(e);
        }
    }
};