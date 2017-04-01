/// <binding Clean='clean' />
"use strict";

//importando dependencias
var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    less = require("gulp-less"),
    sprite = require('png-sprite'),
    LessAutoprefix = require("less-plugin-autoprefix"),
    debug = require('gulp-debug');

var autoprefix = new LessAutoprefix({ browsers: ['last 4 versions'] });
var webroot = "./wwwroot/";

var paths = {
    js: webroot + "js/**/*.js",
    minJs: webroot + "js/**/*.min.js",
    css: webroot + "css/**/*.css",
    minCss: webroot + "css/**/*.min.css",
    concatJsDest: webroot + "js/site.min.js",
    concatCssDest: webroot + "css/site.min.css",
    icons: webroot + "images/icons/*.png",
    iconsPath: webroot + "images/icons",
    imagesPath: webroot + "images",
    cssPath: webroot + "css",
    less: webroot + "css/**/*.less"
};


gulp.task('default',["min:js", "min:css"], function () {
    
});

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", ["clean:js"],function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css",["clean:css"], function () {

    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.concatCssDest));
});

gulp.task("min", ["min:js", "min:css"]);


//less
gulp.task("less", function () {
    return gulp.src(paths.less)
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest(paths.cssPath));
});










gulp.task('build', ['less', 'min:css']);
gulp.task('watch', function () {
    gulp.watch(paths.less, ['build']);
});

gulp.task('sprites', function (done) {
    return gulp.src(paths.icons)
        .pipe(sprite.gulp({
            cssPath: paths.cssPath + '/sprites.less',
            pngPath: paths.imagesPath + '/sprites.png',
            namespace: 'sprites'
        }))
        .pipe(gulp.dest('./'))
});
