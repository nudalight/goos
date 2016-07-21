'use strict';

const gulp = require('gulp');
const jade = require('gulp-jade');
const theJade = require('jade');
const sass = require('gulp-sass');
const debug = require('gulp-debug');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const order = require('gulp-order');
const insert = require('gulp-insert');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const bs = require('browser-sync').create();
const bowerFiles = require('bower-files')();
const gulpRestart = require('gulp-restart');

let pathToJadeData = './dev/jade/data/index.js';


gulp.task('vendor', ['vendor:js', 'vendor:css']);


gulp.task('vendor:js', () => {
  return gulp.src(bowerFiles.ext('js').files)
    .pipe(order([
      '**/angular.js',
      '*'
    ]))
    .pipe(debug())
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app/js'));
});


gulp.task('vendor:css', () => {
  return gulp.src(bowerFiles.ext('css').files)
    .pipe(order([
        '**/reset.css',
        '*'
      ]))
    .pipe(debug())
    .pipe(concat('vendor.min.css'))
    .pipe(cleanCss({
      advanced: true,
      keepSpecialComments: 0,
      restructuring: true
    }))
    .pipe(gulp.dest('./app/css'));
});


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
    .pipe(cleanCss())
    .pipe(raname('output.min.css'))
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
    .pipe(bs.stream())
});


gulp.task('js', () => {
  return gulp.src('dev/js/**/*.js')
    .pipe(order([
      '**/helper/**/*.js',
      '**/angular/module/*.js',
      '**/angular/*.js',
      '**/*.js'
    ]))
    .pipe(debug())
    .pipe(concat('output.js'))
    .pipe(insert.wrap('(function(){\n\n', '\n\n})();'))
    .pipe(gulp.dest('./app/js'))
    .pipe(bs.stream())
    .pipe(rename('output.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app/js'))
    .pipe(bs.stream()) 
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
  // gulp.watch([
  //   './gulpfile.js',
  //   './dev/jade/data/**/*.*'
  // ], gulpRestart);
});


gulp.task('default', ['serve']);