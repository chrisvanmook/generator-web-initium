/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('Gulp webapp generator test', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        done(err);
        return;
      }

      this.webapp = helpers.createGenerator('web-infans', [
        '../../app', [
          helpers.createDummyGenerator(),
          'mocha:app'
        ]
      ]);
      this.webapp.options['skip-install'] = true;

      helpers.mockPrompt(this.webapp, {
        appAuthor: 'Chris',
        appName: 'Test',
        appDesc: 'Blablabla',
        appLicense: 'Copyright',
        appRepo: 'git@github.com:chrisvanmook/generator-web-infans.git',
        analyticsID: '12345678',
        preprocessor: ['sass'],
        javascript: ['usejQuery']
      });

      done();
    }.bind(this));
  });

  it('the generator can be required without throwing', function () {
    // not testing the actual run of generators yet
    this.app = require('../app');
  });

  it('creates expected files', function (done) {
    var expected = [
      '.bowerrc',
      '.editorconfig',
      '.jshintrc',
      'README.MD',
      'package.json',
      'bower.json',
      'gulpfile.js',
      'src/js/main.js',
      'src/views/partials/nav.twig',
      'src/views/partials/footer.twig',
      'src/views/pages/index.twig',
      'src/views/pages/index.json',
      'src/views/layout.twig'
    ];

    this.webapp.run(function () {
      assert.file(expected);
      done();
    });
  });
});
