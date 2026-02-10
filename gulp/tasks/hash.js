
const hash = require('gulp-static-hash');

module.exports = function () {
  $.gulp.task('hash', function () {
    return $.gulp.src('./build/**/*.html')
      .pipe(hash({asset: './build/static/**/*', exts: ['js','css','jpg','png','webp','avif','jpeg']}))
      .pipe($.gulp.dest('./build/'));
  });
}

