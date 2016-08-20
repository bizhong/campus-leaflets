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

            // 密码加密
            user.password = User.passwordEncrypt(user.password);

            // 注册信息保存到数据库
            var _user = new User(user);
            _user.save();

            // 重定向到首页
            this.redirect('/');
        } catch(e) {
            this.body = "注册失败";
            console.log(e);
        }
    }
};