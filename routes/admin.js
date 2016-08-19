// 控制器
var adminIndex = require('../controllers/admin/index.js');

// 中间件
var body = require('koa-body')({ multipart: true });

module.exports = function (router) {
    // 首页
    router.get('/admin/', adminIndex.index);
};