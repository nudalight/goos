'use strict';

const gulp = require('gulp');
const jade = require('gulp-jade');
const theJade = require('jade');
const sass = require('gulp-sass');
const debug = require('gulp-debug');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const order = require('gulp-order');
const insert = require('gulp-insert');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const bs = require('browser-sync').create();

let pathToJadeData = './dev/jade/data/index.js';

/*

  if you got an error use this:
  https://github.com/gulpjs/gulp/issues/217

*/


gulp.task('sass', () => {
  return gulp.src('./dev/sass/**/*.sass')
    .pipe(order([
      '**/variable/*.sass',
      '**/mixin/*.sass',
      '**/override/*.sass',
      '**/segment/*.sass',
      '**/*.sass'
    ]))
    .pipe(debug())
    .pipe(concat('sassify.sass'))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(rename('output.css'))
    .pipe(gulp.dest('./app/css'))
    .pipe(bs.stream())
    .pipe(rename('output.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('./app/css'))
    .pipe(bs.stream())
});


gulp.task('jade', ['jade:index', 'jade:view']);


gulp.task('jade:view', () => {
  return gulp.src('./dev/jade/view/*.jade')
    .pipe(jade({
      pretty: true,
      jade: theJade,
      locals: require(pathToJadeData)
    }))
    .pipe(gulp.dest('./app/html'))
    .pipe(bs.stream())
});


gulp.task('jade:index', () => {
  return gulp.src('./dev/jade/index.jade')
    .pipe(jade({
      pretty: true,
      jade: theJade,
      locals: require(pathToJadeData)
    }))
    .pipe(gulp.dest('./app'))

});


gulp.task('js', () => {
  return gulp.src('dev/js/**/*.js')
    .pipe(order([
      '**/global/**/*.js',
      '**/helper/**/*.js',
      '**/module/**/*.js',
      '**/config/**/*.js',
      '**/controller/**/*.js',
      '**/directive/**/*.js',
      '**/*.js'
    ]))
    .pipe(debug())
    .pipe(concat('output.js'))
    .pipe(insert.wrap('(function(){\n\n', '\n\n})();'))
    .pipe(gulp.dest('./app/js'))
    .pipe(bs.stream())
});


gulp.task('vendor', ['vendor:css', 'vendor:js', 'vendor:font']);


gulp.task('vendor:css', () => {
  gulp.src([
    // 'dev/no-bower/css/**/*.css',
    'bower_components/foundation/css/foundation.min.css',
    'bower_components/angular-material/angular-material.css'
  ]) 
    .pipe(order([
      '**/normalize.*',
      '**.*'
    ]))
    .pipe(concat('vendor.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('./app/css'))
});


gulp.task('vendor:js', () => {
  return gulp.src([
    // 'dev/no-bower/js/**/*.js',
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/angular/angular.min.js',
    'bower_components/angular-cookies/angular-cookies.min.js',
    'bower_components/angular-animate/angular-animate.min.js',
    'bower_components/angular-aria/angular-aria.min.js',
    'bower_components/angular-messages/angular-messages.min.js',
    'bower_components/angular-locker/dist/angular-locker.min.js',
    'bower_components/angular-md5/angular-md5.min.js',
    'bower_components/angular-route/angular-route.min.js',
    'bower_components/angular-material/angular-material.min.js'
  ])
    .pipe(order([
      '**/jquery.*',
      '**/foundation.*',
      '**/angular.*',
      '**/angular-animate.*',
      '**/angular-aria.*',
      '**/*.*'
    ]))
    .pipe(debug())
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('./app/js'))
});


gulp.task('vendor:font', () => {

});


gulp.task('drop', ['sass', 'jade', 'vendor', 'js']);

gulp.task('serve', () => {
  bs.init({
    server: './app',
    port: 4477
  });

  gulp.watch('./dev/sass/**/*.sass', ['sass']);
  gulp.watch('./dev/jade/**/*.jade', ['jade']);
  gulp.watch('./dev/js/**/*.js', ['js']);
});


gulp.task('default', ['serve']);