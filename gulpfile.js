// 引入 gulp
var gulp = require('gulp');

// 引入组件
var less = require('gulp-less');// 编译 Less 
var cssmin = require('gulp-minify-css');// 压缩 CSS
var plumber = require('gulp-plumber');// 处理异常
var notify = require('gulp-notify');// 处理报错

// 编译 Less
gulp.task('less', function() {
    gulp.src('./public/less/*.less')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        // .pipe(cssmin())
        .pipe(gulp.dest('./public/styles/'));
});

// 默认任务
gulp.task('default', ['less'], function() {
    gulp.watch('./public/less/*.less', ['less']); //当所有 Less 文件发生改变时，调用 less 任务
});