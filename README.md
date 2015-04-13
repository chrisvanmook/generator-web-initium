# generator-web-initium - a yeoman web app generator
[![Build Status](https://travis-ci.org/chrisvanmook/generator-web-initium.svg?branch=master)](https://travis-ci.org/chrisvanmook/generator-web-initium) [![dependencies](https://david-dm.org/chrisvanmook/generator-web-initium.svg)](https://david-dm.org/chrisvanmook/generator-web-initium.svg) [![Coverage Status](https://coveralls.io/repos/chrisvanmook/generator-web-initium/badge.svg)](https://coveralls.io/r/chrisvanmook/generator-web-initium)

Web Initium is a yeoman generator that will help you bootstrap your webapp with gulp.
Choose your favorite pre-processor and JS libraries and let Web Initium do the rest.

## Dependencies
Please make sure you have the following installed globally:
- [https://nodejs.org/](NodeJS)
- [https://www.npmjs.com/](npm)
- [http://bower.io/](bower)

## Features
- SASS preprocessing
- Create CSS sourcemaps
- CSS Autoprefixer
- BrowserSync (livereload, sync on other devices)
- Twig Templating Engine
- JSDoc generator
- SASSdoc generator
- Styleguide generator
- JSHint
- Create a build folder:
    - Bump a version number (also git tag)
    - Automatic image optimization
    - Concat and minify JS
    - Minifies HTML
    - Copies all necessary files

## How to install
Simply run `npm install -g generator-web-initium`. Alternatively, you can clone this repo and run `npm link`.

## Configurations
In the generated `gulpfile.js` file, please adjust the global `var config` to your needs.

## Start
Run `npm start` (or alternatively `gulp`) to start the server

## How to build
Run `gulp build`, this will create a `dist` folder with all the necessary files

## Todo's:
- Support LESS and Stylus
- Add options for using sourcemaps, docs and stylesheet.
- Generate favicons / apple icons
- Unit tests
- Documentation

## License
generator-web-initium is distributed under the MIT License.