// 模型
var User = require('../../models/user.js');

module.exports = {
    // 学生注册
    register: function* () {
        yield this.render('user/register', {
            'title': '学生注册'
        });
    },
    // 学生注册处理
    doRegister: function* () {
        try {
            var user = this.request.body;

            if (!user.email && !user.username && !user.password) {// 电子邮箱、用户名和密码都为空
                // 重定向到学生注册失败页面
                this.redirect('/registerFailed/');
            } else {// 电子邮箱、用户名和密码都不为空
                // 手机号码或电话号码为空，特殊处理
                user.tel = user.tel || 0;

                // 密码加密
                user.password = User.passwordEncrypt(user.password);

                // 学生注册信息保存到数据库
                var _user = new User(user);
                yield _user.save();

                // 注册之后直接登录
                // 设置用户状态为“已登录”
                yield User.setUserState(_user._id, '已登录');

                // 用户信息存入会话
                yield this.session.user = {
                    '_id': _user._id,
                    'avatar': _user.avatar,
                    'email': _user.email,
                    'username': _user.username,
                    'belong': _user.belong
                };

                // 重定向到首页
                this.redirect('/');
            }
        } catch(e) {
            this.body = '学生注册失败';
            console.log(e);
        }
    },
    // 学生注册失败
    registerFailed: function* () {
        var result = {
            'head': '学生注册失败',
            'paragraph': '个人信息输入有错，例如：电子邮箱、用户名和密码为空。请再次输入！',
            'continueTitle': '学生注册',
            'continueURL': '/register/'
        };

        yield this.render('message', {
            'title': '学生注册失败',
            'result': result
        });
    }
};