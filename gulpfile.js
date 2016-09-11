// 引入 gulp
var gulp = require('gulp');

// 引入插件
var less = require('gulp-less');// 编译 Less 
var cssmin = require('gulp-minify-css');// 压缩 CSS
var plumber = require('gulp-plumber');// 处理异常
var notify = require('gulp-notify');// 处理报错
var nodemon = require('gulp-nodemon');// 自动启动 Node 程序
var browserSync = require('browser-sync').create();// 自动刷新浏览器

// 编译 Less 任务
gulp.task('less', function() {
    gulp.src('./public/less/*.less')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        // .pipe(cssmin())
        .pipe(gulp.dest('./public/styles/'));
});

// 自动刷新浏览器任务
gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: 'http://localhost:3000',
        files: ['./controllers/**/*.js', './models/*.js', './routes/*.js'],
        browser: "chrome",
        port: 4000,
    });
});

// 自动启动服务器任务
gulp.task('nodemon', function(cb) {
    var started = false;

    return nodemon({
        script: 'app.js'
    }).on('start', function() {
        if (!started) {
            cb();
            started = true;
        }
    });
});

// 默认任务
gulp.task('default', ['browser-sync', 'less'], function() {
    gulp.watch('./public/less/*.less', ['less']); //当所有 Less 文件发生改变时，调用 less 任务
});