# <%= appName %> - <%= appDesc %>

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
Make sure you are in the roots folder, then simply run `npm install`

## Configurations
In the `gulpfile.js` file, please adjust the global `var config` to your needs.

## Start
Run `npm start` (or alternatively `gulp`) to start the server

## How to build
Run `gulp build`, this will create a `dist` folder with all the necessary files
