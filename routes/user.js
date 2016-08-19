// 控制器
var userIndex = require('../controllers/user/index.js');
var userRegister = require('../controllers/user/register.js');
var userLogin = require('../controllers/user/login.js');

// 中间件
var body = require('koa-body')({ multipart: true });

module.exports = function (router) {
    // 首页
    router.get('/', userIndex.index);

    // 注册（学生注册）
    router.get('/register/', userRegister.register);
    router.post('/doRegister/', body, userRegister.doRegister);

    // 登录
    router.get('/login/', userLogin.login);
    router.post('/doLogin/', body, userLogin.doLogin);
};