var gulp = require('gulp'),
    pi = require('gulp-load-plugins')();
//默认配置
var config = {
    lessPath: {
        origin: 'static/less/**/*.less',
        dist: 'static/styles'
    },
    es6Path:{
        origin: 'static/es6/**/*.es6',
        dist: 'static/es5'
    }
};
var pkg = require('./package.json');
var banner = [
    '/**',
    ' * <%= pkg.name %> ',
    ' * @version v<%= pkg.version %>',
    ' * @description 此文件自动生成,请勿人工修改',
    ' */',
    ''
].join('\n');
//监控任务
gulp.task('watch', function () {
    gulp.watch(config.lessPath.origin, ['less'])

});
gulp.task('watchEs6', function () {
    gulp.watch(config.es6Path.origin, ['es6'])

});

//less编译
gulp.task('less', function () {
    return gulp.src(config.lessPath.origin)
        .pipe(pi.changed(config.lessPath.dist,{extension: '.css'}))
        .pipe(pi.sourcemaps.init())//生成maps文件
        .pipe(pi.less())//编译less
        .pipe(pi.cleanCss({
            sourceMap: true,
            restructuring: false,
            removeDuplicates: false,
            mergeAdjacent: false,
            reduceNonAdjacent: false,
            compatibility: "ie8,ie9,+selectors.ie7Hack,+properties.zeroUnits,+properties.urlQuotes,+properties.iePrefixHack"
        }))//自动添加浏览器前缀
        .pipe(pi.sourcemaps.write('.'))//生成maps文件目录
        .pipe(pi.header(banner, {pkg: pkg}))
        .pipe(gulp.dest(config.lessPath.dist));

});
//es6编译



var babel = require("gulp-babel");    // 用于ES6转化ES5

// ES6转化为ES5
// 在命令行使用 gulp toes5 启动此任务
gulp.task("es6", function () {
    return gulp.src(config.es6Path.origin)// ES6 源码存放的路径
        .pipe(babel())
        .pipe(gulp.dest(config.es6Path.dist)); //转换成 ES5 存放的路径
});



gulp.task('default', ['watch','watchEs6']);