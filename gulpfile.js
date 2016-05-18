var gulp = require('gulp')
var webpack = require('gulp-webpack')
var webpackConfig = require('./webpack.config')

gulp.task('cleanDest', function(cb) {
  var rimraf = require('rimraf')
  rimraf('./public/', cb)
})

gulp.task('copyStaticFiles', ['cleanDest'], function() {
  return gulp.src('./src/web/static/*')
    .pipe(gulp.dest('./public/'))
})

gulp.task('build', ['copyStaticFiles'], function(cb) {
  return gulp.src('')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(webpackConfig.output.path))
})
