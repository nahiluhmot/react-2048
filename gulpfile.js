'use strict';

var browserify = require('browserify');
var finalhandler = require('finalhandler');
var gulp = require('gulp');
var http = require('http');
var jasmine = require('gulp-jasmine');
var rimraf = require('rimraf');
var serveStatic = require('serve-static');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');

gulp.task('clean', function(cb) {
  return rimraf('./build/', cb);
});

gulp.task('js', function() {
  return browserify({ entries: './app/app.js' })
    .transform('reactify')
    .bundle()
    .pipe(source('deps.min.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('scss', function() {
  return gulp.src('./style/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('html', function() {
  return gulp.src('./index.html')
    .pipe(gulp.dest('./build/'));
});

gulp.task('build', ['js', 'scss', 'html']);

gulp.task('spec', function() {
  return gulp.src('spec/**/*.js')
    .pipe(jasmine());
});

gulp.task('serve', ['build', 'watch'], function() {
  var port = parseInt(process.env.PORT) || 3000;
  var serve = serveStatic('./build/', { index: ['index.html'] })
  var server = http.createServer(function(req, res){
    var done = finalhandler(req, res)
    serve(req, res, done)
  })

  server.listen(port)
});

gulp.task('watch', function() {
  gulp.watch('./app/**/*', ['js']);
  gulp.watch('./index.html', ['html']);
  gulp.watch('./style/**/*.scss', ['scss']);
});

gulp.task('default', ['build', 'spec']);
