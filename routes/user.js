// 控制器
var userIndex = require('../controllers/user/index.js');
var userRegister = require('../controllers/user/register.js');
var userCheck = require('../controllers/user/check.js');
var userLogin = require('../controllers/user/login.js');
var userPersonal = require('../controllers/user/personal.js');
var userLogout = require('../controllers/user/logout.js');

// 中间件
var body = require('koa-body')({ multipart: true });

module.exports = function (router) {
    // 首页
    router.get('/', userIndex.index);

    // 学生注册
    router.get('/register/', userRegister.register);
    router.post('/doRegister/', body, userRegister.doRegister);
    router.get('/registerFailed/', userRegister.registerFailed);

    // 注册检查（电子邮件、用户名检查是否已注册）
    router.get('/register/check/*', userCheck.check);

    // 登录
    router.get('/login/', userLogin.login);
    router.post('/doLogin/', body, userLogin.doLogin);

    // 个人信息
    router.get('/personal/', userLogin.userLogined, userPersonal.personal);
    router.post('/modifyPersonal/', userLogin.userLogined, body, userPersonal.modifyPersonal);

    // 退出登录
    router.get('/logout/', userLogin.userLogined, userLogout.logout);

    // 我的收藏
};