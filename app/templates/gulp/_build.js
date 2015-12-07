'use strict';

var gulp = require('gulp'),
  inquirer = require('inquirer'),
  plugins = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'del', 'run-sequence']
  });

module.exports = function (config) {
  gulp.task('imagemin:svg', function (cb) {
    gulp.src(config.src_dir + 'assets/img/**/*.svg')
      .pipe(plugins.svgmin())
      .pipe(gulp.dest(config.build_dir + 'assets/img')).on('end', cb).on('error', cb);
  });

  gulp.task('imagemin:default', function (cb) {
    gulp.src([
      config.src_dir + 'assets/img/**/*.png',
      config.src_dir + 'assets/img/**/*.jpg',
      config.src_dir + 'assets/img/**/*.gif',
      config.src_dir + 'assets/img/**/*.jpeg'
    ])
      .pipe(plugins.imageOptimization({
        optimizationLevel: 9,
        progressive: true,
        interlaced: true
      }))
      .pipe(gulp.dest(config.build_dir + 'assets/img')).on('end', cb).on('error', cb);
  });

  /**
   * Optimize images and SVG's
   */
  gulp.task('imagemin', ['imagemin:default', 'imagemin:svg']);

  /**
   * Convert one image to multiple favicons for multiple platforms and devices
   */
  function resizeImage(width, height) {
    return plugins.gm(function (gmfile) {
      return gmfile.resize(100, 100);
    } <% if (imageConverter == 'useImageMagick') { %>, { imageMagick: true <% } %> });
  }

  gulp.task('favicon', function () {
    gulp.src(config.main_favicon)
      .pipe(resizeImage(57, 57)).pipe(plugins.rename('apple-touch-icon-57x57.png')).pipe(gulp.dest('./dist/'));
    gulp.src(config.main_favicon)
      .pipe(resizeImage(114, 114)).pipe(plugins.rename('apple-touch-icon-114x114.png')).pipe(gulp.dest(config.build_dir));

  });

  /**
   * Remove build/ directory
   */
  gulp.task('pre-clean', function (cb) {
    plugins.del([
      config.build_dir + '/**/*'
    ], cb);
  });

  /**
   * Combine, minify and bump js/css
   */
  gulp.task('usemin', function () {
    return gulp.src(config.src_dir + '/index.html')
      .pipe(plugins.usemin({
        css: [
          plugins.autoprefixer(
            'last 2 version', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
          ),
          plugins.combineMq(),
          //uncss({
          //	html: [config.url],
          //	ignore: config.js_classes,
          //	raw: '.morph-button.open .morph-content>div { height: 100%; opacity: 1; }'
          //}),
          plugins.minifyCss(),
          plugins.header(config.banner),
          plugins.rev()
        ],
        html: [plugins.minifyHtml({empty: true, conditionals: true})],
        js_modernizr: [plugins.uglify(), plugins.header(config.banner), plugins.rev()],
        js_ie: [plugins.uglify(), plugins.header(config.banner), plugins.rev()],
        js_bundle: [plugins.uglify(), plugins.header(config.banner), plugins.rev()]
      }))
      .pipe(gulp.dest(config.build_dir + '/'));
  });

  /**
   * Copy files to build directory
   */
  gulp.task('copy', function () {
    gulp.src(config.globs.build, {base: config.src_dir})
      .pipe(gulp.dest(config.build_dir));
  });

  /**
   * Bumping version number and tagging the repository with it.
   * Please read http://semver.org/
   *
   * You can use the commands
   *
   *     gulp patch     # makes v0.1.0 ? v0.1.1
   *     gulp feature   # makes v0.1.1 ? v0.2.0
   *     gulp release   # makes v0.2.1 ? v1.0.0
   *
   * To bump the version numbers accordingly after you did a patch,
   * introduced a feature or made a backwards-incompatible release.
   */

  function inc(importance) {
    gulp.src(['./package.json', './bower.json'])
      // bump the version number in those files
      .pipe(plugins.bump({type: importance}))
      // save it back to filesystem
      .pipe(gulp.dest('./'))
      // commit the changed version number
      .pipe(plugins.git.add())
      .pipe(plugins.git.commit('update version'))

      // read only one file to get the version number
      .pipe(plugins.filter('package.json'))
      // **tag it in the repository**
      .pipe(plugins.tagVersion());
  }

  gulp.task('patch', function () {
    return inc('patch');
  });
  gulp.task('feature', function () {
    return inc('minor');
  });
  gulp.task('release', function () {
    return inc('major');
  });
  gulp.task('prerelease', function () {
    return inc('prerelease');
  });
  gulp.task('nothing', function () {
  });

  gulp.task('jshint', function () {
    return gulp.src(config.globs.js)
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('default'));
  });

  /**
   * - Bump version nr in needed files and tag in git
   * - Generate a build folder
   */
  gulp.task('build', function (callback) {
    inquirer.prompt([{
      type: 'list',
      name: 'bump',
      message: 'What type of bump would you like to do?',
      choices: ['patch', 'feature', 'release', 'prerelease', 'nothing']
    }], function (answers) {
      plugins.runSequence(
        [answers.bump],
        ['jshint', 'templates', 'sass'],
        'pre-clean',
        ['usemin', 'imagemin', 'favicon', 'copy'],
        callback);
    });
  });
};
