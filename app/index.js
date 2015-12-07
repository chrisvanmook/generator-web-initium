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
  }
});
require('./src/prompts')(WebInitiumGenerator);
require('./src/files')(WebInitiumGenerator);
require('./src/write')(WebInitiumGenerator);
require('./src/install')(WebInitiumGenerator);

module.exports = WebInitiumGenerator;
