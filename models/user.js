// 引用模块
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// 定义用户模式
var UserSchema = new mongoose.Schema({
    avatar: { type: String, default: '/upload/avatars/avatar.png' },// 头像
    email: { unique: true, type: String },// 电子邮件
    username: { unique: true, type: String },// 用户名
    sex: { type: String, default: '男' },// 性别
    tel: Number,// 手机号码或电话号码
    belong: { type: String, default: '学生' },// 身份（学生，社团，部门，团队，公司，管理员）
    password: String,// 密码
    state: { type: String, default: '已登录' }// 状态（已登录，未登录）
});
// 定义用户实例方法
UserSchema.methods = {};
    
// 定义用户静态方法，在 Model 层就能使用
UserSchema.statics = {
    // 查找电子邮箱
    findEmail: function(email) {},
    // 查找用户名
    findUsername: function(username) {},
    // 密码加密
    passwordEncrypt: function(password) {
        return bcrypt.hashSync(password);
    },
    // 密码解密
    passwordDecrypt: function(password) {},
    // 验证登录
    verifyLogin: function(user) {
        var emailUsername = user.emailusername;// 电子邮件或者用户名
        var password = user.password;

        var result = this.findOne({$or: [{email: emailUsername}, {username: emailUsername}]});

        if (result.state === '已登录') {// 查找结果中的用户状态为“已登录”，不能再次登录
            this.body = '该用户已登录。';
        } else {// 查找结果中的用户密码与用户输入密码一致，登录成功
            if (password === result.password) {
                this.session.ID = result._id;
                this.session.AVATAR = result.avatar;
                this.session.USERNAME = result.username;
                this.session.BELONG = result.belong;

                // 重定向到首页
                this.redirect('/');
            } else {
                // 重定向到登录页面
                this.redirect('/login/');
            }
        }
    },
    // 查看个人信息
    viewInfo: function() {},
    // 修改个人信息
    modifyInfo: function() {},
    // 忘记密码
    forgotPassword: function() {},
    // 登出
    logout: function() {}
};

// 编译用户模型
var User = mongoose.model('User', UserSchema);

// 导出用户模型
module.exports = User;