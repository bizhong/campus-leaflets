// 依赖模块
var koa = require('koa');
var static = require('koa-static');
var path = require('path');
var render = require('koa-ejs');
var router = require('koa-router')();
var mongoose = require('mongoose');
var session = require('koa-session');
var fs = require('fs');

// 应用程序实例对象
var app = koa();

// 静态文件
app.use(static(path.join(__dirname, 'public')));

// 视图路径和模板
render(app, {
    root: path.join(__dirname, 'views'),
    layout: '',
    viewExt: 'html',
    cache: false,
    debug: true
});

// 连接数据库
var dbPath = 'mongodb://127.0.0.1/campusleaflets';
mongoose.connect(dbPath);

// 中间件
app.keys = ['some secret hurr'];
app.use(session(app));

// 路由
var userRoute = require('./routes/user.js');
var corporationRoute = require('./routes/corporation.js');
var adminRoute = require('./routes/admin.js');

app.use(function *(next) {
    var _user = this.session.user || null;
    
    //应用共享用户数据
    this.state.user = _user;
    
    yield *next;
});

userRoute(router);
corporationRoute(router);
adminRoute(router);
app.use(router.routes());

// 错误处理
app.on('error', function(err, ctx) {
    console.log(err);
});

// 服务器监听地址
var port = process.env.PORT || 3000;
app.listen(port);

// 打印日志
console.log('Campus Leaflets started on port '+ port);