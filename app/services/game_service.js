var _ = require('underscore');
var Errors = require('../errors.js');

var GameService = {
  reverse: function(list) {
    return _.foldr(list, function(xs, x) {
      xs.push(x);
      return xs;
    }, []);
  },

  columns: function(matrix) {
    return _.zip.apply(undefined, matrix);
  },

  rotateClockwise: function(matrix) {
    return _.map(GameService.columns(matrix), GameService.reverse);
  },

  flip: function(matrix) {
    var transform = GameService.rotateClockwise;
    return transform(transform(matrix));
  },

  rotateCounterClockwise: function(matrix) {
    var transform = GameService.rotateClockwise;
    return transform(transform(transform(matrix)));
  },

  validTile: function(value) {
    return (value === parseInt(value, 10)) &&
           (value !== 1) &&
           ((value & (value - 1)) === 0);
  },

  validRow: function(row) {
    return (row instanceof Array) &&
           (row.length == 4) &&
           (_.every(row, GameService.validTile));
  },

  validBoard: function(board) {
    return (board instanceof Array) &&
           (board.length === 4) &&
           (_.every(board, GameService.validRow));
  },

  condense: function(list) {
    return _.filter(list, function(element) {
      return element !== 0;
    });
  },

  padWith: function(list, elem, max) {
    var padding;

    if (list.length >= max) {
      padding = [];
    } else {
      padding = _(max - list.length).times(function() { return elem; });
    }
    return padding.concat(list);
  },

  canShiftDown: function(list) {
    var result = _.foldr(list, function(memo, elem) {
      if (memo.canShift) {
        return memo;
      } else if (memo.foundZero) {
        return { foundZero: true, canShift: (elem !== 0), lastNumber: elem };
      } else if (memo.lastNumber == elem) {
        return { canShift: true };
      } else {
        return { foundZero: (elem === 0), canShift: false, lastNumber: elem };
      }
    }, { foundZero: false, canShift: false, lastNumber: null });

    return result.canShift;
  },

  shiftDown: function(list) {
    var condensed = GameService.condense(list);

    var result = _.foldr(condensed, function(memo, elem) {
      if (memo.lastNumber == elem) {
        memo.array.shift();
        memo.array.unshift(elem * 2);
        return {
          lastNumber: 0,
          array: memo.array,
          score: memo.score + (elem * 2)
        };
      } else {
        memo.array.unshift(elem);
        return {
          lastNumber: elem,
          array: memo.array,
          score: memo.score
        };
      }
    }, { lastNumber: 0, array: [], score: 0 });

    return {
      array: GameService.padWith(result.array, 0, 4),
      score: result.score
    };
  },

  canBoardMove: function(direction, board) {
    var rotated;

    switch(direction) {
      case 'up':
        rotated = GameService.rotateClockwise(board);
        break;
      case 'down':
        rotated = GameService.rotateCounterClockwise(board);
        break;
      case 'left':
        rotated = GameService.flip(board);
        break;
      case 'right':
        rotated = board;
        break;
      default:
        throw Errors.badDirectionError(direction);
    }

    return _.some(rotated, GameService.canShiftDown);
  },

  moveBoard: function(direction, board) {
    var rotated;
    var unrotate;
    var result;

    switch(direction) {
      case 'up':
        rotated = GameService.rotateClockwise(board);
        unrotate = GameService.rotateCounterClockwise;
        break;
      case 'down':
        rotated = GameService.rotateCounterClockwise(board);
        unrotate = GameService.rotateClockwise;
        break;
      case 'left':
        rotated = GameService.flip(board);
        unrotate = GameService.flip;
        break;
      case 'right':
        rotated = board;
        unrotate = function(matrix) { return matrix };
        break;
      default:
        throw Errors.badDirectionError(direction);
    }

    result = _.foldr(_.map(rotated, GameService.shiftDown), function(obj, res) {
      obj.board.unshift(res.array);
      return {
        board: obj.board,
        score: obj.score + res.score
      };
    }, { board: [], score: 0 });

    return { board: unrotate(result.board), score: result.score };
  },

  isGameOver: function(board) {
    return _.every(['up', 'down', 'left', 'right'], function(dir) {
      return !GameService.canBoardMove(dir, board);
    });
  },

  emptySpaces: function(board) {
    var zeroCoords = [];

    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board.length; j++) {
        if (board[i][j] === 0) {
          zeroCoords.push([i, j]);
        }
      }
    }

    return zeroCoords;
  },

  updatePosition: function(x, y, value, board) {
    var copy = _.invoke(board, 'slice');
    copy[x][y] = value;
    return copy;
  }
};

module.exports = GameService;
