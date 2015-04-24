'use strict';

var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')();

module.exports = function (config) {

  /**
   * Start the develop environment
   */
  gulp.task('watch', ['sass', 'templates', 'sassdoc', 'styleguide', 'jsdoc'], function () {
    gulp.watch([config.src_dir + "scss/**/*.scss"], ['sass', 'sassdoc', 'styleguide']);
    gulp.watch([config.src_dir + "**/*.html", config.src_dir + "views/**/*.twig", config.src_dir + "views/**/*.json"], ['templates']);
    gulp.watch([config.src_dir + "js/**/*.js", "!" + config.src_dir + "/js/bundle.js"], ['bs-reload']);
  });
};
