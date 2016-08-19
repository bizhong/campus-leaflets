// 控制器
var corporationIndex = require('../controllers/corporation/index.js');
var corporationRegister = require('../controllers/corporation/register.js');

// 中间件
var body = require('koa-body')({ multipart: true });

module.exports = function (router) {
    // 首页
    router.get('/corporation/', corporationIndex.index);

    // 注册（单位注册）
    router.get('/corporation/register/', corporationRegister.register);
    router.post('/corporation/doRegister/', body, corporationRegister.doRegister);
};