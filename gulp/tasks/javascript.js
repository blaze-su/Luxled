'use strict';

module.exports = function() {
  $.gulp.task('copy:javascripts', function() {
    return $.gulp.src('./source/js/**/*.js', { since: $.gulp.lastRun('copy:javascripts') })
      .pipe($.gulp.dest($.config.root + '/assets/js'));
  });
};
