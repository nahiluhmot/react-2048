var path = require('path');

global.rootRequire = function(file) {
  return require(path.join(__dirname, '..', 'app', file));
};

