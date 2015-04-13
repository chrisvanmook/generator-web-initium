'use strict';

var generators = require('yeoman-generator'),
  wiredep = require('wiredep'),
  fs = require('fs'),
  yosay = require('yosay');

module.exports = generators.Base.extend({
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
    this.log(yosay("Welcome to Web Infans, a generator that will help you bootstrap your webapp within a few seconds!"));
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

      done();
    }.bind(this));
  },

  writing: {
    gulpfile: function () {
      this.template('gulpfile.js');
    },

    packageJSON: function () {
      this.template('_package.json', 'package.json');
    },

    git: function () {
      this.copy('gitignore', '.gitignore');
      //this.copy('gitattributes', '.gitattributes');
    },

    bower: function () {
      this.copy('bowerrc', '.bowerrc');
      this.template('bower.json');
    },

    markdown: function () {
      this.copy('readme.md', 'README.MD');
    },

    jshint: function () {
      this.copy('jshintrc', '.jshintrc');
    },

    editorConfig: function () {
      this.copy('editorconfig', '.editorconfig');
    },

    mainStylesheet: function () {

      switch (this.preprocessor) {
        case 'sass':

          break;

        case 'less':
          break;

        case 'sass':
          break;

        default:


      }

      //this.copy(css, 'app/styles/' + css);
    },

    js: function () {
      this.write("./src/js/main.js", "");
    },

    html: function () {
      var viewDir = "./src/views/",
        indexDir = viewDir + "pages/",
        partialsDir = viewDir + "partials/",
        partials = {
          nav: "<nav></nav>",
          footer: "<footer></footer>"
        };

      this.template("layout.twig", viewDir + "layout.twig");
      this.copy("index.twig", indexDir + "index.twig");
      this.copy("index.json", indexDir + "index.json");

      this.write(partialsDir + "nav.twig", partials.nav);
      this.write(partialsDir + "footer.twig", partials.footer);
    }
  },

  install: function () {

    // perform a npm install
    if (!this.options['skip-install']) {
      this.installDependencies({
        bower: false, // package should contain postinstall: bower install,
        skipMessage: this.options['skip-install-message']
      });
    }

    this.on('end', function () {

      // wire Bower packages to html file
      wiredep({
        directory: this.destinationPath('/src/bower_components'),
        bowerJson: JSON.parse(fs.readFileSync(this.destinationPath('/bower.json'))),
        ignorePath: /^(\.\.\/)*\.\./,
        src: this.destinationPath('/src/views/layout.twig'),
        exclude: []
      });

      this.log(yosay("All done! Please run `gulp` to serve your brand new web app!"));

    }.bind(this));
  }

});
