#generator-web-infans - a yeoman web app generator

##Dependencies
Please make sure you have the following installed globally:
- NodeJS
- [https://www.npmjs.com/](npm)
- [http://bower.io/](bower)

##Features
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
Make sure you are in the roots folder, then simply run `npm install`

## Configurations
In the `gulpfile.js` file, please adjust the global `var config` to your needs.

## Start
Run `npm start` (or alternatively `gulp`) to start the server

## How to build
Run `gulp build`, this will create a `dist` folder with all the necessary files

## License
generator-web-infans is distributed under the MIT License. One file and one file only (src/js/app.js) is distributed under the slightly modified MIT License.
