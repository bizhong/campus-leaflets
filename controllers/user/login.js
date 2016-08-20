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

            // 验证登录
            User.verifyLogin(user);
        } catch(e) {
            this.body = "注册失败";
            console.log(e);
        }
    }
};