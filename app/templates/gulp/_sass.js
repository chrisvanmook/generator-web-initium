'use strict';

var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  plugins = require('gulp-load-plugins')();

module.exports = function (config) {
  /**
   * Generate css file from SASS, apply autoprefixer and create sourcemaps
   */
  gulp.task('sass', function () {
    return gulp.src(config.src_dir + 'scss/*.scss')
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({
        errLogToConsole: true
      }))
      .pipe(plugins.autoprefixer(
        'last 2 version', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
      ))
      .pipe(plugins.sourcemaps.write('./'))
      .pipe(gulp.dest(config.src_dir + 'css/'))
      .pipe(browserSync.reload({stream: true}));
  });
};
