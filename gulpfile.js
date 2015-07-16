'use strict';

var gulp   = require('gulp'       );
var jshint = require('gulp-jshint');
var mocha  = require('gulp-mocha' );
var gutil  = require('gulp-util'  );

var JS_FILES = ['*.js',
                'lib/*.js',
                'models/*.js',
                'routes/*.js',
                'tests/*.js'];


// Named Tasks
gulp.task('default', ['lint', 'mocha']);


gulp.task('lint', function() {
  return gulp.src(JS_FILES)
    .pipe(jshint('.jshintrc'))                // use .jshintrc
    .pipe(jshint.reporter('jshint-stylish')); // report stylish
});

gulp.task('mocha', ['lint'], function() {     // finish lint before run
  return gulp.src(['tests/**/*_test.js'], {read: false})
    .pipe(mocha({
      reporter: 'spec',
      globals: { should: require('chai').should }
    }))    //
    .once('error', function() {
      process.exit(1);
    })
    .once('end', function() {
      process.exit();
    });
});

// gulp.task('watch-mocha', function() {
//   gulp.watch(['lib/**', 'test/**'], ['lint', 'mocha']); // run mocha when first array changes?
// });



