'use strict';
var sassGlob = require('gulp-sass-glob');
var csso = require('gulp-csso');
const gulp = require('gulp');
const cssunit = require('gulp-css-unit');

module.exports = function() {
    $.gulp.task('sass', function() {
        return $.gulp.src('./source/style/style.scss')
            .pipe(sassGlob())
            .pipe($.gp.sourcemaps.init())
            .pipe($.gp.sass()).on('error', $.gp.notify.onError({ title: 'Style' })) //- перевод в *.css
            .pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig })) //-для поддержки всех браузеров
            .pipe(csso())
            .pipe($.gp.sourcemaps.write())
            .pipe($.gulp.dest($.config.root + '/assets/css')) //-сохраняет файлы в указаную папку
            .pipe($.browserSync.stream()); //-команда для перезагрузки браузера
    })
};