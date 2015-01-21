var _ = require('underscore');

/**
 * This class is an immutable 2048 Board.
 */
var Board = function(rows) {
  this.rows = function() {
    return rows.slice();
  };

  this.cols = function() {
    return _.zip.apply(null, rows);
  };
};

module.exports = Board;
