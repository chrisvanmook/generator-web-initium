'use strict';

var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'sc5-styleguide']
  });

module.exports = function (config) {
  /**
   * Generate Styleguide
   */

  gulp.task('styleguide:generate', function () {
    return gulp.src(config.src_dir + 'scss/*.scss')
      .pipe(plugins.sc5Styleguide.generate({
        title: 'My Styleguide',
        server: true,
        port: 3002,
        rootPath: config.styleguide,
        overviewPath: 'README.md'
        //styleVariables: config.src_dir + 'scss/_settings.scss'
      }))
      .pipe(gulp.dest(config.styleguide));
  });

  gulp.task('styleguide:applystyles', function () {
    return gulp.src(config.src_dir + 'scss/style.scss')
      .pipe(plugins.sass({
        errLogToConsole: true
      }))
      .pipe(plugins.sc5Styleguide.applyStyles())
      .pipe(gulp.dest(config.styleguide));
  });

  /**
   * Generate styleguide
   */
  gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);

};
