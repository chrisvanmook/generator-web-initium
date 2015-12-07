'use strict';

var wiredep = require('wiredep'),
  yosay = require('yosay'),
  fs = require('fs');

module.exports = function (WebInitiumGenerator) {

  WebInitiumGenerator.prototype.writeFiles = function writeFiles() {
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
        directory: this.destinationPath('./src/bower_components'),
        bowerJson: JSON.parse(fs.readFileSync(this.destinationPath('./bower.json'))),
        ignorePath: /^(\.\.\/)*\.\./,
        src: this.destinationPath('./src/views/layout.twig'),
        exclude: []
      });
      this.log(yosay("All done! Please run `gulp serve` to serve your brand new web app!"));
    }.bind(this));
  }
};
