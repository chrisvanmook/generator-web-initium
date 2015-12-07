'use strict';

var gulp = require('gulp'),
  browserSync = require('browser-sync');

module.exports = function (config) {

  gulp.task('bs-reload', function () {
    browserSync.reload();
  });

  /**
   * Start the develop environment
   */
  gulp.task('watch', ['sass', 'templates', 'sassdoc', 'styleguide', 'jsdoc'], function () {
    gulp.watch([config.src_dir + "scss/**/*.scss"], ['sass', 'sassdoc', 'styleguide']);
    gulp.watch([config.src_dir + "**/*.html", config.src_dir + "views/**/*.<% if (templateEngine == 'twig') { %>twig<% } %><% if (templateEngine == 'jade') { %>jade<% } %>", config.src_dir + "views/**/*.json"], ['templates']);
    gulp.watch([config.src_dir + "js/**/*.js", "!" + config.src_dir + "/js/bundle.js"], ['bs-reload']);
  });
};
