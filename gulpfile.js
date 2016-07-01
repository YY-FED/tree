﻿'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var util = require('gulp-util');

/**
 * 公共错误处理函数
 * 使用示例：
 *  .pipe(uglify().on('error', errHandle))
    .pipe(rename('u.min.js'))
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
var errHandle = function ( err ) {
    // 报错文件名
    var fileName = err.fileName;
    // 报错类型
    var name = err.name;
    // 报错信息
    var message = err.message;
    // 出错代码位置
    var loc = err.loc;

    var logInfo = '报错文件：' + fileName + '报错类型：' + name + '出错代码位置：' + loc.line + ',' + loc.column;

    util.log( logInfo );

    this.end();
}


var globs = {
    js:[
        'js/treeComp.js'
    ],
    css: 'css/tree.css'
};

gulp.task('js', function() {
    return gulp.src(globs.js)
        .pipe(concat('u-tree.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .on('error', errHandle)
        .pipe(rename('u-tree.min.js'))
        .pipe(gulp.dest('dist/js'));
});


gulp.task('css',function(){
    return gulp.src(globs.css)
        .pipe(gulp.dest('dist/css'))
        .pipe(minifycss())
        .pipe(rename('tree.min.css'))
        .pipe(gulp.dest('dist/css'));
})


gulp.task('dist', ['js', 'css'], function(){
});
