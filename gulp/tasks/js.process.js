'use strict';

var uglify = require('gulp-uglify');

module.exports = function() {
    $.gulp.task('js:process', function() {
        return $.gulp.src($.path.app)
            // .pipe($.gp.sourcemaps.init())
            .pipe($.gp.concat('app.js'))
            .pipe(uglify())
            // .pipe($.gp.sourcemaps.write())
            .pipe($.gulp.dest($.config.root + '/assets/js'))
    })
};