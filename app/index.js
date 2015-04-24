'use strict';

var generators = require('yeoman-generator'),
  fs = require('fs-extra'),
  yosay = require('yosay');

//noinspection JSUnusedGlobalSymbols
var WebInitiumGenerator = generators.Base.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);
    this.destinationRoot('./');
    this.option('skip-install', {
      desc: 'Skips the installation of dependencies',
      type: Boolean
    });

    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });
  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();
    this.log(yosay("Welcome to Web Initium, a generator that will help you bootstrap your webapp within a few seconds!"));
    var prompts = [{
      type: 'textfield',
      name: 'appAuthor',
      message: 'What is your name?'
    }, {
      type: 'textfield',
      name: 'appName',
      message: 'What is the name of your webapp?',
      default: 'webapp'
    }, {
      type: 'textfield',
      name: 'appDesc',
      message: 'Describe your webapp:'
    }, {
      type: 'textfield',
      name: 'appLicense',
      message: 'License:',
      default: 'MIT'
    }, {
      type: 'textfield',
      name: 'appRepo',
      message: 'Your git repository:'
    }, {
      type: 'textfield',
      name: 'analyticsID',
      message: 'What is your Google Analytics ID?'
    }, {
      type: 'list',
      name: 'preprocessor',
      message: 'How would you like to use your CSS',
      choices: [{
        name: 'Sass',
        value: 'sass',
        checked: true
      }
        //  , {
        //  name: 'Less',
        //  value: 'less',
        //  checked: false
        //}, {
        //  name: 'Stylus',
        //  value: 'stylus',
        //  checked: false
        //}, {
        //  name: 'None',
        //  value: 'noPreprocessor',
        //  checked: false
        //}
      ]
    }, {
      type: 'checkbox',
      name: 'javascript',
      message: 'Which javascript libraries do you want to use',
      choices: [{
        name: 'jQuery',
        value: 'usejQuery',
        checked: true
      }, {
        name: 'Modernizr',
        value: 'useModernizr',
        checked: true
      }, {
        name: 'FastClick',
        value: 'useFastClick',
        checked: true
      }, {
        name: 'HTML5Shiv',
        value: 'useHTML5Shiv',
        checked: true
      }, {
        name: 'RespondJS',
        value: 'useRespondJS',
        checked: true
      }]
    },{
      type: 'list',
      name: 'imageConverter',
      message: 'Which software are you using to process images with? (please have one of the options installed already, see readme for more info)',
      choices: [{
          name: 'ImageMagick',
          value: 'useImageMagick',
          checked: true
        },{
          name: 'GraphicsMagick',
          value: 'useGraphicsMagick',
          checked: false
        }
      ]
      }];

    this.prompt(prompts, function (answers) {
      var jsLibs = answers.javascript;

      var hasjsLib = function (js) {
        return jsLibs.indexOf(js) !== -1;
      };

      this.appAuthor = answers.appAuthor;
      this.appName = answers.appName;
      this.appDesc = answers.appDesc;
      this.appRepo = answers.appRepo;
      this.appLicense = answers.appLicense;

      this.analyticsID = answers.analyticsID;
      this.preprocessor = answers.preprocessor;

      this.usejQuery = hasjsLib('usejQuery');
      this.useModernizr = hasjsLib('useModernizr');
      this.useFastClick = hasjsLib('useFastClick');
      this.useHTML5Shiv = hasjsLib('useHTML5Shiv');
      this.useRespondJS = hasjsLib('useRespondJS');

      this.imageConverter = answers.imageConverter;

      done();
    }.bind(this));
  },
});
require('./src/files')(WebInitiumGenerator);
require('./src/write')(WebInitiumGenerator);
require('./src/install')(WebInitiumGenerator);

module.exports = WebInitiumGenerator;
