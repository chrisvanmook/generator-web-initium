'use strict';

var path = require('path');
var _ = require('lodash');

/**
 * Replace sourceFolder with destFolder in filePath
 * if filePath has any sourceFolder as prefix
 * choose longest match if there are multiple prefixes that match
 * @param  {String} filePath    File path to be altered
 * @param  {Object} folderPairs Hash of pairs of sourceFolder:destFolder
 *                              Similar to what stored in this.props.paths
 * @return {String}             new file path
 */
function replacePrefix(filePath, folderPairs) {
  var bestMatch = '';

  _.forEach(folderPairs, function(destFolder, sourceFolder) {
    if (filePath.indexOf(sourceFolder) === 0 && sourceFolder.length > bestMatch.length) {
      bestMatch = sourceFolder;
    }
  });

  if (bestMatch.length) {
    return filePath.replace(bestMatch, folderPairs[bestMatch]);
  }
  else {
    return filePath;
  }
}

module.exports = {
  replacePrefix: replacePrefix
};
