'use strict';

var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  browserSync = require('browser-sync');

module.exports = function (config) {

  /**
   * Start the develop environment
   * Run the server on the src directory
   */
  gulp.task('serve', ['watch'], function () {
    browserSync({
      xip: true,
      open: true,
      notify: true,
      server: {
        baseDir: config.src_dir
      }
    });
  });

  /**
   * Run server on the dist directory
   */
  gulp.task('serve:dist', ['build'], function() {
    browserSync({
      xip: true,
      open: true,
      notify: true,
      server: {
        baseDir: config.build_dir
      }
    });
  });

};
