'use strict';

var browserify = require('browserify');
var finalhandler = require('finalhandler');
var gulp = require('gulp');
var http = require('http');
var rimraf = require('rimraf');
var serveStatic = require('serve-static');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');

gulp.task('clean', function(cb) {
  rimraf('./build/', cb);
});

gulp.task('js', function() {
  browserify({ entries: './app/main.jsx' })
    .transform('reactify')
    .bundle()
    .pipe(source('deps.min.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('scss', function() {
  gulp.src('./style/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('html', function() {
  gulp.src('./index.html')
    .pipe(gulp.dest('./build/'));
});

gulp.task('build', ['js', 'scss', 'html']);

gulp.task('serve', ['build'], function() {
  var port = parseInt(process.env.PORT) || 3000;
  var serve = serveStatic('./build/', { index: ['index.html'] })
  var server = http.createServer(function(req, res){
    console.log(req.url);
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

gulp.task('default', ['build']);
