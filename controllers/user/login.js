// 模型
var User = require('../../models/user.js');

module.exports = {
    // 登录
    login: function* () {
        yield this.render('user/login', {
            'title': '登录'
        });
    },
    // 登录处理
    doLogin: function* () {
        try {
            var user = this.request.body;
            var emailusername = user.emailusername;// 电子邮箱（或用户名）
            var password = user.password;// 密码

            if (!emailusername && !password) {// 电子邮箱（或用户名）和密码都为空
                // 重定向到登录页面
                this.redirect('/login/');
            } else {// 电子邮箱（或用户名）和密码都不为空
                // 验证登录
                // 查询符合条件的第一条用户记录
                var result = yield User.findOne({$or: [{'email': emailusername}, {'username': emailusername}]});

                if (result === null) {// 查找结果为空
                    // 重定向到登录页面
                    this.redirect('/login/');
                } else {// 查找结果不为空
                    if (result.state === '已登录') {// 查找结果中的用户状态为“已登录”，不能再次登录
                        this.body = '该用户已登录。';
                    } else {
                        if (User.passwordCompare(password, result.password)) {// 查找结果中的用户密码与用户输入密码一致，登录成功
                            // 设置用户状态为“已登录”
                            yield User.setUserState(result._id, '已登录');

                            // 用户信息存入会话
                            yield this.session.user = {
                                '_id': result._id,
                                'avatar': result.avatar,
                                'email': result.email,
                                'username': result.username,
                                'belong': result.belong,
                                'password': password
                            };

                            // 不同身份重定向到不同页面
                            if (result.belong === '学生') {// 学生
                                // 重定向到首页
                                this.redirect('/');
                            } else if (result.belong === '管理员') {// 管理员
                                // 重定向到管理员首页
                                this.redirect('/admin/');
                            } else {// 单位（社团，部门，团队，商店，公司）
                                // 重定向到单位首页
                                this.redirect('/corporation/');
                            }
                        } else {// 查找结果中的用户密码与用户输入密码不一致，登录失败
                            // 重定向到登录页面
                            this.redirect('/login/');
                        }
                    }
                }
            }
        } catch(e) {
            this.body = "登录失败";
            console.log(e);
        }
    },
    // 用户已登录（学生、单位和管理员）
    userLogined: function* (next) {
        var user = this.session.user;// 获取用户会话

        if (!user) {// 用户会话不存在，无权访问
            // 重定向首页
            this.redirect('/');
        } else {// 用户会话存在，有权访问
            yield* next;
        }
    },
    // 学生已登录
    studentLogined: function* (next) {
        var user = this.session.user || {};// 获取用户会话，无设置为一个空对象

        if (user.belong !== '学生') {// 身份不是学生，无权访问
            // 重定向首页
            this.redirect('/');
        } else {// 身份是学生，有权访问
            yield* next;
        }

    },
    // 单位已登录
    corporationLogined: function* (next) {
        var user = this.session.user || {};// 获取用户会话，无设置为一个空对象

        if (user.belong === 'undefined' && user.belong === '学生' && user.belong === '管理员') {// 身份为空，且是学生和管理员，无权访问
            // 重定向首页
            this.redirect('/');
        } else {// 身份是单位，有权访问
            yield* next;
        }

    },
    // 管理员已登录
    adminLogined: function* (next) {
        var user = this.session.user || {};// 获取用户会话，无设置为一个空对象

        if (user.belong !== '管理员') {// 身份不是管理员，无权访问
            // 重定向首页
            this.redirect('/');
        } else {// 身份是管理员，有权访问
            yield* next;
        }
    }
};