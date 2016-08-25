// 控制器
var corporationIndex = require('../controllers/corporation/index.js');
var corporationRegister = require('../controllers/corporation/register.js');

// 中间件
var body = require('koa-body')({ multipart: true });

module.exports = function (router) {
    // 单位注册
    router.get('/corporation/register/', corporationRegister.register);
    router.post('/corporation/doRegister/', body, corporationRegister.doRegister);
    router.get('/corporation/registerSucceed/', corporationRegister.registerSucceed);
    router.get('/corporation/registerFailed/', corporationRegister.registerFailed);

    // 单位信息

    // 我的传单（单位首页）
    router.get('/corporation/', corporationIndex.index);

    // 发布传单
};