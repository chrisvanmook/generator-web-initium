/*global describe, beforeEach, it */
'use strict';
var path = require('path'),
  fs = require('fs-extra'),
  helpers = require('yeoman-generator').test,
  assert = require('yeoman-generator').assert;

var mockPrompt = {
  appAuthor: 'Chris',
  appName: 'Test',
  appDesc: 'Blablabla',
  appLicense: 'Copyright',
  appRepo: 'http://github.com/chrisvanmook/generator-web-infans.git',
  analyticsID: 'UA-12345678',
  preprocessor: ['sass'],
  javascript: ['usejQuery']
};

describe('Gulp webapp generator test', function () {
  beforeEach(function (done) {

    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, './temp'), function (dir) {
        // Mock installation bower files
        fs.createFileSync("./src/bower_components/jquery/dist/jquery.js");
        fs.writeJsonSync("./src/bower_components/jquery/bower.json", {name: 'jquery', main: "dist/jquery.js"});
      })
      .withArguments(['skip-install'])
      .withPrompts(mockPrompt)
      .on('end', done);
  });

  describe('File Creation', function () {

    it('the generator can be required without throwing', function () {
      // not testing the actual run of generators yet
      this.app = require('../app');
    });

    it('should create the expected files', function () {
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

      assert.file(expected);
    });
  });


  describe('File Customization', function () {

    it('should update bower.js with prompt data', function () {
      assert.fileContent('bower.json', /['|"]*name['|"]*[ ]*:[ ]*['|"]Test['|"]/);
      assert.fileContent('bower.json', /['|"]*description['|"]*[ ]*:[ ]*['|"]Blablabla['|"]/);
      assert.fileContent('bower.json', /['|"]*license['|"]*[ ]*:[ ]*['|"]Copyright['|"]/);
    });

    it('should update package.json with prompt data', function () {
      assert.fileContent('package.json', /['|"]*name['|"]*[ ]*:[ ]*['|"]Test['|"]/);
      assert.fileContent('package.json', /['|"]*description['|"]*[ ]*:[ ]*['|"]Blablabla['|"]/);
      assert.fileContent('package.json', /['|"]*main['|"]*[ ]*:[ ]*['|"]gulpfile.js['|"]/);
      assert.fileContent('package.json', /['|"]*url['|"]*[ ]*:[ ]*['|"]http:\/\/github.com\/chrisvanmook\/generator-web-infans.git['|"]/);
    });

    it('should update layout.twig with prompt data', function () {
      assert.fileContent('src/views/layout.twig', /<title>Test<\/title>/);
    });

    it('should update layout.twig with the bower scripts', function () {
      assert.fileContent('src/views/layout.twig', /<script src="\/bower_components\/jquery\/dist\/jquery.js"><\/script>/);
    });

    it('should update layout.twig with the google analytics code', function () {
      assert.fileContent('src/views/layout.twig', /"UA-12345678"/);
    });

  });

  describe('Prompt fields are left empty', function () {

    //todo

    //mockPrompt.analyticsID = '';
    //
    //it('should remove google analytics code from layout.twig if code is not set', function () {
    //  //assert.noFileContent('src/views/layout.twig', /"GoogleAnalyticsObject"/);
    //});
  });
});