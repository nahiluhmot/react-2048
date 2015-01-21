var _ = require('underscore');
var Errors = require('../errors.js');

var GameService = {
  reverse: function(list) {
    return _.foldr(list, function(xs, x) {
      xs.push(x);
      return xs;
    }, []);
  },

  columns: function(board) {
    return _.zip.apply(board);
  },

  canBoardMove: function(direction, board) {
    switch(direction) {
      case 'up':
        break;
      case 'down':
        break;
      case 'left':
        break;
      case 'right':
        break;
      default:
        throw Errors.badDirectionError(direction);
    }
  }
};

module.exports = GameService;
