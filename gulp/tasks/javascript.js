'use strict';

var uglify = require('gulp-uglify');

module.exports = function() {
    $.gulp.task('copy:javascripts', function() {
        return $.gulp.src('./source/js/app.js', { since: $.gulp.lastRun('copy:javascripts') })
            .pipe(uglify())
            .pipe($.gulp.dest($.config.root + '/assets/js'));
    });
};