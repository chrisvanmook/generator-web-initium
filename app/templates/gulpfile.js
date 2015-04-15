(function () {
	/* global require, console */
  // generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
	'use strict';

	var gulp = require('gulp'),
		browserSync = require('browser-sync'),
		sass = require('gulp-sass'),
		prefix = require('gulp-autoprefixer'),
		minifyCSS = require('gulp-minify-css'),
		uncss = require('gulp-uncss'),
		sourcemaps = require('gulp-sourcemaps'),
		combineMq = require('gulp-combine-mq'),
		runSequence = require('run-sequence'),
		util = require('gulp-util'),
		reload = browserSync.reload,
		uglify = require('gulp-uglify'),
		imageop = require('gulp-image-optimization'),
		usemin = require('gulp-usemin'),
		header = require('gulp-header'),
		rev = require('gulp-rev'),
		swig = require('gulp-swig'),
		data = require('gulp-data'),
		del = require('del'),
		jshint = require('gulp-jshint'),
		styleguide = require('sc5-styleguide'),
		connect = require('gulp-connect'),
		minifyHtml = require('gulp-minify-html'),
		jsdoc = require("gulp-jsdoc"),
		git = require('gulp-git'),
		bump = require('gulp-bump'),
		filter = require('gulp-filter'),
		tag_version = require('gulp-tag-version'),
		inquirer = require('inquirer'),
		sassdoc = require('sassdoc'),
    svgmin = require('gulp-svgmin'),
    gm = require('gulp-gm'),
    rename = require("gulp-rename");

	/**
	 * Put all your configurations here!
	 */
	var config = {
 		src_dir: './src/', //your working directory
		build_dir: './dist/', // the build directory
    main_favicon: './src/favicon.png',
		styleguide: './styleguide',
		jsdoc: './doc/js',
		sassdoc: './doc/sass',
		bower_dir: './src/bower_components/', // bower components, default in src directory, change .bowerrc file if changed
		url: 'http://127.0.0.1:8000',
		js_classes: [ // if you use javascript to add selectors, pleace specify the classes here as well
			'.im-a-js-added-class'
		],
		globs: { // glob patterns
			build: [
				'./src/assets/fonts/**/*.woff2',
				'./src/assets/fonts/icons/**/*',
				'./src/mail.php',
				'./src/config.php',
				'./src/favicon.ico',
				'./src/.htaccess',
				'./src/./assets/{img,img/**}'
			],
			js: ["./src/*.js", "!./src/js/bundle.js"]
		},
		banner: '/*! Build: ' + new Date().toString() + ' */\n'
	};

  gulp.task('imagemin:svg', function (cb) {
    gulp.src(config.src_dir + 'assets/img/**/*.svg')
      .pipe(svgmin())
      .pipe(gulp.dest(config.build_dir + 'assets/img')).on('end', cb).on('error', cb);
  });

  gulp.task('imagemin:default', function (cb) {
    gulp.src([
      config.src_dir + 'assets/img/**/*.png',
      config.src_dir + 'assets/img/**/*.jpg',
      config.src_dir + 'assets/img/**/*.gif',
      config.src_dir + 'assets/img/**/*.jpeg'
    ])
      .pipe(imageop({
        optimizationLevel: 9,
        progressive: true,
        interlaced: true
      }))
      .pipe(gulp.dest(config.build_dir + 'assets/img')).on('end', cb).on('error', cb);
  });

  /**
   * Automatically minify images when creating a build
   */
  gulp.task('imagemin', ['imagemin:default', 'imagemin:svg']);

  /**
   * Convert one image to multiple favicons for multiple platforms and devices
   */

  function resizeImage(width, height){
    return gm(function (gmfile) {
      return gmfile.resize(100, 100);
    }<% if (imageConverter == 'useImageMagick') { %>, {
      imageMagick: true
      <% } %>});
  }

  gulp.task('favicon', function () {
    gulp.src(config.main_favicon)
      .pipe(resizeImage(57, 57))).pipe(rename('apple-touch-icon-57x57.png')).pipe(gulp.dest('./dist/'));
    gulp.src(config.main_favicon)
      .pipe(resizeImage(114, 114)).pipe(rename('apple-touch-icon-114x114.png')).pipe(gulp.dest(config.build_dir));

  });

	/**
	 * Generate css file from SASS, apply autoprefixer and create sourcemaps
	 */
	gulp.task('sass', function () {
		return gulp.src(config.src_dir + 'scss/*.scss')
			.pipe(sourcemaps.init())
			.pipe(sass({
				errLogToConsole: true
			}))
			.pipe(prefix(
				'last 2 version', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
			))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(config.src_dir + 'css/'))
			.pipe(reload({
				stream: true
			}));
	});

	/**
	 * Hint javascript
 	 */
	gulp.task('jshint', function () {
		return gulp.src(config.globs.js)
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(reload({
				stream: true
			}));
	});

	/**
	 * Remove build/ directory
	 */
	gulp.task('pre-clean', function (cb) {
		del([
			config.build_dir + '/**/*'
		], cb);
	});

	/**
	 * Generate Styleguide
	 */
	gulp.task('styleguide:generate', function() {
		return gulp.src(config.src_dir + 'scss/*.scss')
			.pipe(styleguide.generate({
				title: 'My Styleguide',
				server: true,
                port: 3002,
				rootPath: config.styleguide,
				overviewPath: 'README.md'
                //styleVariables: config.src_dir + 'scss/_settings.scss'
            }))
			.pipe(gulp.dest(config.styleguide));
	});

	gulp.task('styleguide:applystyles', function() {
		return gulp.src(config.src_dir + 'scss/style.scss')
			.pipe(sass({
				errLogToConsole: true
			}))
			.pipe(styleguide.applyStyles())
			.pipe(gulp.dest(config.styleguide));
	});

	/**
	 * Generate JS documentation
	 */
	gulp.task('jsdoc', function(){
		gulp.src(config.src_dir + "js/*.js")
			.pipe(jsdoc.parser())
			.pipe(jsdoc.generator(config.jsdoc))
	});

	/**
	 * Generate sassdoc
	 */
	gulp.task('sassdoc', function () {
		return gulp.src(config.src_dir + '**/*.scss')
			.pipe(sassdoc({
				dest: config.sassdoc
			}));
	});

	/**
	 * Combine and version js/css
	 */
	gulp.task('usemin', function () {
		return gulp.src(config.src_dir + '/index.html')
			.pipe(usemin({
				css: [
					prefix(
						'last 2 version', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
					),
					combineMq(),
					//uncss({
					//	html: [config.url],
					//	ignore: config.js_classes,
					//	raw: '.morph-button.open .morph-content>div { height: 100%; opacity: 1; }'
					//}),
					minifyCSS(),
					header(config.banner),
					rev()
				],
				html: [minifyHtml({empty: true, conditionals: true})],
				js: [uglify(), header(config.banner), rev()],
				js_ie: [uglify(), header(config.banner), rev()]
			}))
			.pipe(gulp.dest(config.build_dir + '/'));
	});

	/**
	 * Copy files to build directory
	 */
	gulp.task('copy', function () {
		gulp.src(config.globs.build, {base: config.src_dir})
			.pipe(gulp.dest(config.build_dir));

		gulp.src(config.globs.favicons, {base: config.src_dir + "/assets/favicons"})
			.pipe(gulp.dest(config.build_dir));
	});

	/**
	 * Compile twig templates
	 */
	gulp.task('templates', function () {
		gulp.src(config.src_dir + 'views/pages/*.twig')
			.pipe(swig({
				load_json: true,
				defaults: {
					cache: false
				}
			}))
			.pipe(gulp.dest(config.src_dir))
			.pipe(reload({
				stream: true
			}));
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
		// get all the files to bump version in
		return gulp.src(['./package.json', './bower.json'])
			// bump the version number in those files
			.pipe(bump({type: importance}))
			// save it back to filesystem
			.pipe(gulp.dest('./'))
			// commit the changed version number
			.pipe(git.commit('update version'))

			// read only one file to get the version number
			.pipe(filter('package.json'))
			// **tag it in the repository**
			.pipe(tag_version());
	}

	gulp.task('patch', function() { return inc('patch'); });
	gulp.task('feature', function() { return inc('minor'); });
	gulp.task('release', function() { return inc('major'); });
	gulp.task('prerelease', function() { return inc('prerelease'); });

	/**
	 * Run the server on the src directory
	 */
	gulp.task('server', function() {
		connect.server({
			root: 'src',
			port: 8000
		});
	});

	/**
	 * Run server on the build directory
	 */
	gulp.task('server:prod', function() {
		connect.server({
			root: 'dist',
			port: 80
		});
		//connect.serverClose();
	});

	/**
	 * Start browser sync, connect with browsersync ui
	 * through port 3001 (check terminal when running)
	 */
	gulp.task('browser-sync', function () {
		browserSync({
			proxy: config.url,
			xip: true,
			open: false,
			notify: true
		});
	});

	/**
	 * Shorthand task to force reload browser sync
	 */
	gulp.task('bs-reload', function () {
		browserSync.reload();
	});

	/**
	 * Generate styleguide
	 */
	gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);

	/**
	 * - Bump version nr in needed files and tag in git
	 * - Generate a build folder
	 */
	gulp.task('build', function (callback) {
		inquirer.prompt([{
			type: 'list',
			name: 'bump',
			message: 'What type of bump would you like to do?',
			choices: ['patch', 'feature', 'release', 'prerelease']
		}], function(answers){
			runSequence(
				[answers.bump],
				['jshint', 'templates', 'sass'],
				'pre-clean',
				['usemin', 'imagemin', 'copy'],
				callback);
		});
	});

	/**
	 * Start the develop environment
	 */
	gulp.task('default', ['server', 'sass', 'templates', 'sassdoc', 'styleguide', 'jsdoc', 'browser-sync'], function () {
		gulp.watch([config.src_dir + "scss/**/*.scss"], ['sass', 'sassdoc', 'styleguide']);
		gulp.watch([config.src_dir + "**/*.html", config.src_dir + "views/**/*.twig", config.src_dir + "views/**/*.json"], ['templates']);
		gulp.watch([config.src_dir + "js/**/*.js", "!" + config.src_dir + "/js/bundle.js"], ['bs-reload']);
	});
})();
