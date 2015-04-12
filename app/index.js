var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);

    // Next, add your custom code
    this.option('coffee'); // This method adds support for a `--coffee` flag
  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    if (!this.options['skip-welcome-message']) {
      //this.log(yosay('\'Allo \'allo! Out of the box I include HTML5 Boilerplate, jQuery, and a gulpfile.js to build your app.'));
    }

    var prompts = [{
      type: 'textfield',
      name: 'appName',
      message: 'What is the name of your webapp?'
    }, {
      type: 'list',
      name: 'preprocessor',
      message: 'How would you like to use your CSS',
      choices: [{
        name: 'Sass',
        value: 'sass',
        checked: true
      }, {
        name: 'Less',
        value: 'less',
        checked: false
      }, {
        name: 'Stylus',
        value: 'stylus',
        checked: false
      }, {
        name: 'None',
        value: 'noPreprocessor',
        checked: false
      }]
    }, {
      type: 'checkbox',
      name: 'javascript',
      message: 'Which javascript libraries do you want to include',
      choices: [{
        name: 'jQuery',
        value: 'includejQuery',
        checked: true
      }, {
        name: 'Modernizr',
        value: 'includeModernizr',
        checked: true
      }, {
        name: 'FastClick',
        value: 'includeFastClick',
        checked: true
      }, {
        name: 'HTML5Shiv',
        value: 'includeHTML5Shiv',
        checked: true
      }, {
        name: 'RespondJS',
        value: 'includeRespondJS',
        checked: true
      }]
    }];

    this.prompt(prompts, function (answers) {
      var jsLibs = answers.javascript;

      var hasjsLib = function (js) {
        return jsLibs.indexOf(js) !== -1;
      };

      this.appName = answers.appName;
      this.preprocessor = answers.preprocessor;

      this.includejQuery = hasjsLib('includejQuery');
      this.includeModernizr = hasjsLib('includeModernizr');
      this.includeHTML5Shiv = hasjsLib('includeHTML5Shiv');
      this.includeRespondJS = hasjsLib('includeRespondJS');

      done();
    }.bind(this));


  },

  writing: {
    gulpfile: function () {
      console.log(this.preprocessor);
      console.log(this.appName);
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

    html: function () {
      this.template("index.twig");
      this.copy("index.json");
    }
  }

});
