# generator-web-initium - a yeoman web app generator
[![NPM info](https://nodei.co/npm/generator-web-initium.png?downloads=true)](https://nodei.co/npm/generator-web-initium.png?downloads=true)
[![Build Status](https://travis-ci.org/chrisvanmook/generator-web-initium.svg?branch=master)](https://travis-ci.org/chrisvanmook/generator-web-initium) [![dependencies](https://david-dm.org/chrisvanmook/generator-web-initium.svg)](https://david-dm.org/chrisvanmook/generator-web-initium.svg) [![Coverage Status](https://coveralls.io/repos/chrisvanmook/generator-web-initium/badge.svg?branch=master)](https://coveralls.io/r/chrisvanmook/generator-web-initium?branch=master)

Web Initium is a yeoman generator that will help you bootstrap your webapp with gulp.
Choose your favorite pre-processor, JS libraries etc... and let Web Initium do the rest.

There are of course lots of webapp scaffolding generators out there (for example the awesome [generator-gulp-webapp](https://github.com/yeoman/generator-gulp-webapp/). This repo, however, is made to make the build and develop process more personal, richer and efficient. In other words, the developer can choose from a broad variety of customizations and automated tasks, ready to make it big and rich! :)

## Dependencies
Please make sure you have the following installed globally:
- [NodeJS](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [bower](http://bower.io/)

## Features
- SASS preprocessing
- Create CSS sourcemaps
- CSS Autoprefixer
- BrowserSync (livereload, sync on other devices)
- Twig Templating Engine
- Image resizer (e.g. for generating favicons)
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
Run `npm install -g generator-web-initium`. Alternatively, you can clone this repo and run `npm link`.
Make sure GraphicsMagick or ImageMagick is installed on your system and properly set up in your `PATH`.

Ubuntu:

```shell
apt-get install imagemagick
apt-get install graphicsmagick
```

Mac OS X (using [Homebrew](http://brew.sh/)):

```shell
brew install imagemagick
brew install graphicsmagick
```

Windows & others:
- GraphicsMagick: [http://www.graphicsmagick.org/download.html](http://www.graphicsmagick.org/download.html)
- ImageMagick: [http://www.imagemagick.org/script/binary-releases.php](http://www.imagemagick.org/script/binary-releases.php)

Confirm that GraphicsMagick or ImageMagick is properly set up by executing `gm -version` or `convert -version` in a terminal.

## Configurations
In the generated `gulpfile.js` file, please adjust the global `var config` to your needs.

## Start
Run `yo web-initium` and follow the steps. After successfully installed everything, run `gulp` (or alternatively `npm start`) to start the server with your generated webapp.

## How to build
Run `gulp build`, this will create a `dist` folder with all the necessary files

## How it works
All the dev files are situated in the `src` directory:
- **CSS** If you are using a css pre-processor, use the corresponding folder (`src/scss`, `src/less`, `src/styl`). A css file will be generated in the `css` folder. Sourcemap files will also be generated in this folder. If you are NOT using a css pre-processor, then just use files in the `src/css` folder.
- **HTML** HTML files are in the `src/views` folder. Since we are using `twig` as a template language, we have a `src/views/layout.twig` file, that can be used for all pages. All twig files in the `src/views/pages` folder should have the same name as the `.json` files. This way, content and markup are nicely separated.
- **Assets** All images, fonts, icons and other non-script files should be put in the `src/assets` directory.
- **JavaScript** Use the `src/js` folder. If you need to add scripts to your html files, please do so in between the `<!-- build:js /js/bundle.js --> <!-- endbuild -->` comments in the `src/views/layout` file, as this will make sure your script will be concatenated and minified together with all the other scripts.
- **Documentation** The `src/doc` folder is where all the generated documentation will be. For JavaScript, we'll be using JSDoc, for SASS SassDoc.

## Todo's:
- Support LESS and Stylus
- Looking into gulp-load-plugins
- Support for coffeescript & typescript
- Add options for using sourcemaps, docs and stylesheet.
- Generate favicons / apple icons
- Improve tests
- Documentation

## License
generator-web-initium is distributed under the MIT License.
