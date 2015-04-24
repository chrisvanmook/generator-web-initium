(function () {
	/* global require, console */
  // generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
	'use strict';

	var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

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

  require('./gulp/sass')(config);
  require('./gulp/styleguide')(config);
  require('./gulp/doc')(config);
  require('./gulp/html')(config);
  require('./gulp/build')(config);
  require('./gulp/watch')(config);
  require('./gulp/server')(config);

})();
