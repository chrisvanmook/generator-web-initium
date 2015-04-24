'use strict';

var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  browserSync = require('browser-sync');

module.exports = function (config) {
  /**
   * Compile twig templates
   */
  gulp.task('templates', function () {
    gulp.src(config.src_dir + 'views/pages/*.twig')
      .pipe(plugins.swig({
        load_json: true,
        defaults: {
          cache: false
        }
      }))
      .pipe(gulp.dest(config.src_dir))
      .pipe(browserSync.reload({stream: true}));
  });
};
