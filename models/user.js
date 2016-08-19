// 引用模块
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// 定义用户模式
var UserSchema = new mongoose.Schema({
    avatar: {// 头像
        type: String,
        default: ''
    },
    email: {// 电子邮件
        unique: true,
        type: String
    },
    username: {// 用户名
        unique: true,
        type: String
    },
    sex: {// 性别
        type: String,
        default: '男'
    },
    tel: Number,// 手机号码或电话号码
    belong: {// 身份（学生，公司，社团，实验室，管理员）
        type: String,
        default: '学生'
    },
    password: String,// 密码
    state: {// 状态（已登录，未登录）
        type: String,
        default: '已登录'
    }
});

// 定义用户方法
UserSchema.methods = {
    // 查找电子邮箱
    findEmail: function(email) {},
    // 查找用户名
    findUsername: function(username) {},
    // 注册
    register: function(email, username, password, belong, sex) {},
    // 是否已登录
    isLogined: function() {},
    // 登录
    login: function(emailOrUsername, password, callback) {},
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