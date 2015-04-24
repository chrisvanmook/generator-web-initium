'use strict';

var path = require('path');

var files = require('../files.json');

/**
 * Take a template file path and create a copy description object
 * Add an _ to the file's basename if it's a template
 * Look for the js preprocessor equivalent file and use it if exist
 */
function resolvePaths(type) {
  return function(file) {
    var src = file, dest = file;

    if(type == "template") {
      var basename = path.basename(file);
      src = file.replace(basename, '_' + basename);
    }
    //
    //if(src.match(/\.js$/)) {
    //  var preprocessorFile = this.sourceRoot() + '/' + src.replace(/\.js$/, '.' + this.props.jsPreprocessor.srcExtension);
    //  if(this.fs.exists(preprocessorFile)) {
    //    src = src.replace(/\.js$/, '.' + this.props.jsPreprocessor.srcExtension);
    //    dest = dest.replace(/\.js$/, '.' + this.props.jsPreprocessor.extension);
    //  }
    //}

    return {
      src: src,
      dest: dest,
      type: type
    };
  };
}

module.exports = function(WebInitiumGenerator) {

  /**
   * Prepare all files from files.json and add them to `this.files` as
   * copy description object
   */
  WebInitiumGenerator.prototype.prepareFiles = function prepareFiles() {

    this.files = []
      .concat(files.staticFiles.map(resolvePaths("staticFiles"), this))
      .concat(files.folders.map(resolvePaths("folders"), this))
      .concat(files.templates.map(resolvePaths("template"), this));

  };

};
