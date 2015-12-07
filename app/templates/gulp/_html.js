'use strict';

var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  <% if (templateEngine == 'jade') { %>path = require('path'),
    fs = require('fs'), <% } %>
  browserSync = require('browser-sync');

module.exports = function (config) {
  /**
   * Compile twig templates
   */
  gulp.task('templates', function () {
    gulp.src(config.src_dir + 'views/pages/*.twig')
 <% if (templateEngine == 'twig') { %>.pipe(plugins.swig({
        load_json: true,
        defaults: {
          cache: false
        }
      }))<% } %>
      <% if (templateEngine == 'jade') { %>.pipe(plugins.data(function (file) {
        return JSON.parse(fs.readFileSync(config.src_dir + 'views/pages/' + path.basename(file.path) + '.json'));
      }))
      .pipe(plugins.jade({
        pretty: true
      }))<% } %>
      .pipe(gulp.dest(config.src_dir))
      .pipe(browserSync.reload({stream: true}));
  });
};
