'use strict';

var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'sassdoc']
  });

module.exports = function (config) {
  /**
   * Generate JS documentation
   */
  gulp.task('jsdoc', function(){
    gulp.src(config.src_dir + "js/*.js")
      .pipe(plugins.jsdoc.parser())
      .pipe(plugins.jsdoc.generator(config.jsdoc))
  });

  /**
   * Generate sassdoc
   */
  gulp.task('sassdoc', function () {
    return gulp.src(config.src_dir + '**/*.scss')
      .pipe(plugins.sassdoc({
        dest: config.sassdoc
      }));
  });
};
