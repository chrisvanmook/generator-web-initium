'use strict';

var prompts = require('../prompts.json');
var yosay = require('yosay');

module.exports = function(WebInitiumGenerator) {
  WebInitiumGenerator.prototype.prompting = function () {
    var done = this.async();
    this.log(yosay("Welcome to Web Initium, a generator that will help you bootstrap your webapp within a few seconds!"));

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

      this.templateEngine = answers.templateEngine;

      this.analyticsID = answers.analyticsID;
      this.preprocessor = answers.preprocessor;

      this.usejQuery = hasjsLib('usejQuery');
      this.useModernizr = hasjsLib('useModernizr');
      this.useFastClick = hasjsLib('useFastClick');
      this.useHTML5Shiv = hasjsLib('useHTML5Shiv');
      this.useRespondJS = hasjsLib('useRespondJS');

      this.imageConverter = answers.imageConverter;

      done();
    }.bind(this))
  }
};
