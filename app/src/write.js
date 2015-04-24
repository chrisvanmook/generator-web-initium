'use strict';

var utils = require('./utils'),
  _ = require('lodash'),
  fs = require('fs-extra'),
  config = require('../config.json');

/**
 * Process content with data with _.template
 * Add a home made preprocessing which removes lines where there is only a
 * template instruction
 */
function processor(data) {
  return function process(content) {
    return _.template(content.toString().replace(/\n<%([^-=])/g, '<%$1'), data);
  };
}

module.exports = function (WebInitiumGenerator) {

  /**
   * Pass through each files and actually copy them
   */
  WebInitiumGenerator.prototype.writing = function writing() {
    var process = processor(this);

    this.files.forEach(function (file) {
      var dest = utils.replacePrefix(file.dest, config);
      try {
        switch (file.type) {
          case "template":
            this.template(this.templatePath(file.src), this.destinationPath(dest));
            break;

          case "folders":
            fs.mkdirs(this.destinationPath(file.src));
            break;

          case "staticFiles":
            this.copy(this.templatePath(file.src), this.destinationPath(dest));
            break;
        }
      } catch (error) {
        console.error('Template processing error on file', file.src);
        throw error;
      }
    }, this);
  };
};
