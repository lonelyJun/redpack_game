var gulp = require("gulp");
var imagemin = require("gulp-imagemin");

gulp.task('imagemin', function (cb) {
  gulp.src('./build/web-mobile/**/*.{png,jpg,jpeg}')
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      })
    ]))
    .pipe(gulp.dest("./build/web-mobile/"))
    .on("end", cb);
});