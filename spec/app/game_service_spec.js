var GameService = rootRequire('game_service.js');
var _ = require('underscore');

describe('GameService', function() {
  var subject = GameService;

  describe('.reverse', function() {
    var list = [1, 2, 3, 4];

    it('returns a copy of the given list in reverse order', function() {
      expect(subject.reverse(list)).toEqual([4, 3, 2, 1]);
      expect(list).toEqual([1, 2, 3, 4]);
    });
  });

  describe('.columns', function() {
    var matrix = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ];

    var expected = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
    ];

    it('transposes the given matrix', function() {
      expect(subject.columns(matrix)).toEqual(expected);
    });
  });

  describe('.validTile', function() {
    describe('when the argument not an Integer', function() {
      var list = [null, undefined, 'yolo', 2.1];

      it('returns false', function() {
        expect(_.every(list, subject.validTile)).toEqual(false);
      });
    });

    describe('when the argument is an integer', function() {
      describe('when the argument is one', function() {
        it('returns false', function() {
          expect(subject.validTile(1)).toEqual(false);
        });
      });

      describe('when the argument is zero', function() {
        it('returns true', function() {
          expect(subject.validTile(0)).toEqual(true);
        });
      });

      describe('when the arg is a power of two other than one', function() {
        var list = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];

        it('returns true', function() {
          expect(_.every(list, subject.validTile)).toEqual(true);
        });
      });

      describe('when the argument is not a power of two or zero', function() {
        var list = [3, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15];

        it('returns true', function() {
          expect(_.every(list, subject.validTile)).toEqual(false);
        });
      });
    });
  });

  describe('.validRow', function() {
    describe('when the argument is not an Array', function() {
      var args = [null, undefined, 12, {}];

      it('returns false', function() {
        expect(_.every(args, subject.validRow)).toEqual(false);
      });
    });

    describe('when the argument is an Array', function() {
      describe('but its length is not four', function() {
        var args = [
          [],
          [0],
          [0, 2],
          [0, 2, 4],
          [0, 2, 4, 8, 16]
        ];

        it('returns false', function() {
          expect(_.every(args, subject.validRow)).toEqual(false);
        });
      });

      describe('and its length is four', function() {
        describe('but at least one of its elements is not valid', function() {
          var args = [
            [ 0,  1,  2,  3],
            [ 4,  5,  6,  7],
            [ 8,  9, 10, 11],
            [12, 13, 14, 15]
          ];

          it('returns false', function() {
            expect(_.every(args, subject.validRow)).toEqual(false);
          });
        });

        describe('and all of its elements are valid', function() {
          var args = [
            [   0,    2,     4,     8],
            [  16,   32,    64,   128],
            [ 256,  512,  1024,  2048],
            [4096, 8192, 16384, 32768]
          ];

          it('returns true', function() {
            expect(_.every(args, subject.validRow)).toEqual(true);
          });
        });
      });
    });
  });

  describe('.validBoard', function() {
    describe('when the argument is not an Array', function() {
      var args = [null, undefined, 'lol', {}];

      it('returns false', function() {
        expect(_.every(args, subject.validBoard)).toEqual(false);
      });
    });

    describe('when the argument is an Array', function() {
      describe('but its length is not four', function() {
        var board = [
          [0, 2, 2, 0],
          [4, 0, 2, 0],
          [0, 8, 2, 0],
        ];

        it('returns false', function() {
          expect(subject.validBoard(board)).toEqual(false);
        });
      });

      describe('and its length not four', function() {
        describe('but at one row is invalid', function() {
          var board = [
            [0, 2, 2, 0],
            [4, 0, 2, 0],
            [0, 8, 2, 3],
            [4, 0, 2, 0],
          ];

          it('returns false', function() {
            expect(subject.validBoard(board)).toEqual(false);
          });
        });

        describe('and all of its rows are valid', function() {
          var board = [
            [0, 2, 2, 0],
            [4, 0, 2, 0],
            [0, 8, 2, 2],
            [4, 0, 2, 0],
          ];

          it('returns true', function() {
            expect(subject.validBoard(board)).toEqual(true);
          });
        });
      });
    });
  });

  describe('.condense', function() {
    var list = [1, 'test', 0, null, 0, undefined, {}, []];
    var expected = [1, 'test', null, undefined, {}, []];

    it('filters the zeros out of an Array', function() {
      expect(subject.condense(list)).toEqual(expected);
    });
  });

  describe('.padWith', function() {
    describe('when the list is at least the max size', function() {
      var list = [1, 2, 3];
      var expected = [1, 2, 3];

      it('returns the original Array', function() {
        expect(subject.padWith(list, 4, 3)).toEqual(expected);
      });
    });

    describe('when the list is less than the max size', function() {
      var list = [1, 2];
      var expected = [0, 0, 1, 2];

      it('adds enough of the padding elements', function() {
        expect(subject.padWith(list, 0, 4)).toEqual(expected);
      });
    });
  });

  describe('.canShiftDown', function() {
    describe('when the list can shift down', function() {
      var args = [
        [0, 0, 0, 4],
        [2, 8, 4, 2],
        [0, 8, 2, 4],
        [0, 0, 0, 0],
      ];

      it('returns true', function () {
        expect(_.every(args, subject.canShiftDown)).toEqual(false);
      });
    });

    describe('when the list cannot shift down', function() {
      var args = [
        [2, 0, 0, 4],
        [8, 8, 4, 2],
        [0, 8, 0, 0],
        [2, 0, 2, 0],
      ];

      it('returns false', function () {
        expect(_.every(args, subject.canShiftDown)).toEqual(true);
      });
    });
  });

  describe('.shiftDown', function() {
    describe('when the Array cannot shift down', function() {
      var args = [
        [ 0, 0, 0,  0],
        [ 0, 2, 4,  8],
        [16, 8, 4,  2],
        [ 2, 4, 8, 16]
      ];
      var expected = _.map(args.slice(), function(array) {
        return {
          array: array,
          score: 0
        };
      });

      it('returns the original Array', function() {
        _.each(_.zip(args, expected), function(argAndExpected) {
          var arg = argAndExpected[0];
          var expected = argAndExpected[1];
          expect(subject.shiftDown(arg)).toEqual(expected);
        });
      });
    });

    describe('when the Array can shift down', function() {
      var args = [
        [ 0, 0, 2,  0],
        [ 2, 0, 4,  4],
        [16, 8, 4,  4],
        [ 2, 0, 2, 16]
      ];

      var expected = [
        { array: [ 0,  0, 0,  2], score: 0 },
        { array: [ 0,  0, 2,  8], score: 8 },
        { array: [ 0, 16, 8,  8], score: 8 },
        { array: [ 0,  0, 4, 16], score: 4 }
      ];

      it('shifts the Array down', function() {
        _.each(_.zip(args, expected), function(argAndExpected) {
          var arg = argAndExpected[0];
          var expected = argAndExpected[1];
          expect(subject.shiftDown(arg)).toEqual(expected);
        });
      });
    });
  });

  describe('.canBoardMove', function() {
    describe('when the direction is "up"', function() {
      describe('and the board can move up', function() {
        var boards = [
          [
            [0, 2, 2, 4],
            [0, 4, 4, 2],
            [0, 8, 4, 4],
            [0, 8, 0, 0]
          ],
          [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 2]
          ],
          [
            [4, 8, 2, 8],
            [4, 2, 8, 2],
            [2, 8, 2, 4],
            [8, 2, 8, 4]
          ],
        ];

        it('returns true', function() {
          var result = _.every(boards, function(board) {
            return subject.canBoardMove('up', board);
          });

          expect(result).toEqual(true);
        });
      });

      describe('but the board cannot move up', function() {
        var boards = [
          [
            [0, 2, 2, 4],
            [0, 4, 4, 2],
            [0, 8, 0, 4],
            [0, 0, 0, 0]
          ],
          [
            [8, 8, 4, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
          ],
          [
            [2, 8, 2, 8],
            [8, 2, 8, 2],
            [2, 8, 2, 8],
            [8, 2, 8, 2]
          ],
        ];

        it('returns false', function() {
          var result = _.every(boards, function(board) {
            return subject.canBoardMove('up', board);
          });

          expect(result).toEqual(false);
        });
      });
    });

    describe('when the direction is "down"', function() {
      describe('and the board can move down', function() {
        var boards = [
          [
            [0, 2, 2, 4],
            [0, 4, 4, 2],
            [0, 8, 0, 4],
            [0, 0, 0, 0]
          ],
          [
            [8, 8, 4, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
          ],
          [
            [2, 8, 2, 8],
            [8, 2, 8, 2],
            [2, 8, 2, 4],
            [8, 2, 8, 4]
          ],
        ];

        it('returns true', function() {
          var result = _.every(boards, function(board) {
            return subject.canBoardMove('down', board);
          });

          expect(result).toEqual(true);
        });
      });

      describe('but the board cannot move down', function() {
        var boards = [
          [
            [0, 2, 2, 4],
            [0, 4, 4, 2],
            [0, 8, 8, 4],
            [0, 2, 2, 2]
          ],
          [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 2]
          ],
          [
            [2, 8, 2, 8],
            [8, 2, 8, 2],
            [2, 8, 2, 8],
            [8, 2, 8, 2]
          ],
        ];

        it('returns false', function() {
          var result = _.every(boards, function(board) {
            return subject.canBoardMove('down', board);
          });

          expect(result).toEqual(false);
        });
      });
    });

    describe('when the direction is "left"', function() {
      describe('and the board can move left', function() {
        var boards = [
          [
            [0, 2, 2, 4],
            [0, 4, 4, 2],
            [0, 8, 8, 4],
            [0, 2, 2, 2]
          ],
          [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 2]
          ],
          [
            [2, 8, 2, 8],
            [8, 2, 8, 2],
            [2, 8, 2, 8],
            [8, 2, 4, 4]
          ],
        ];

        it('returns true', function() {
          var result = _.every(boards, function(board) {
            return subject.canBoardMove('left', board);
          });

          expect(result).toEqual(true);
        });
      });

      describe('but the board cannot move left', function() {
        var boards = [
          [
            [2, 2, 4, 0],
            [4, 8, 2, 0],
            [2, 8, 4, 0],
            [2, 4, 2, 0]
          ],
          [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [2, 0, 0, 0]
          ],
          [
            [2, 8, 2, 8],
            [8, 2, 8, 2],
            [2, 8, 2, 8],
            [8, 2, 8, 2]
          ],
        ];

        it('returns false', function() {
          var result = _.every(boards, function(board) {
            return subject.canBoardMove('left', board);
          });

          expect(result).toEqual(false);
        });
      });
    });

    describe('when the direction is "right"', function() {
      describe('and the board can move right', function() {
        var boards = [
          [
            [2, 2, 4, 0],
            [4, 8, 2, 0],
            [2, 8, 4, 0],
            [2, 4, 2, 0]
          ],
          [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [2, 0, 0, 0]
          ],
          [
            [2, 8, 2, 8],
            [8, 2, 8, 2],
            [2, 8, 4, 4],
            [8, 2, 8, 2]
          ],
        ];

        it('returns true', function() {
          var result = _.every(boards, function(board) {
            return subject.canBoardMove('right', board);
          });

          expect(result).toEqual(true);
        });
      });

      describe('but the board cannot move right', function() {
        var boards = [
          [
            [0, 2, 2, 4],
            [0, 4, 8, 2],
            [0, 2, 8, 4],
            [0, 2, 4, 2]
          ],
          [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 2]
          ],
          [
            [2, 8, 2, 8],
            [8, 2, 8, 2],
            [2, 8, 2, 8],
            [8, 2, 8, 2]
          ],
        ];

        it('returns false', function() {
          var result = _.every(boards, function(board) {
            return subject.canBoardMove('right', board);
          });

          expect(result).toEqual(false);
        });
      });
    });

    describe('when the direction is anything else', function() {
      it('raises a BadDirectionError', function() {
        expect(function() { subject.canBoardMove('lol', []); }).toThrow({
          name: 'BadDirectionError',
          validDirections: ['up', 'down', 'left', 'right'],
          given: 'lol'
        });
      });
    });
  });

  describe('.moveBoard', function() {
    describe('when the direction is "up"', function() {
      describe('when the board can move up', function() {
        var boards = [
          [
            [0, 2, 2, 4],
            [0, 4, 4, 2],
            [0, 8, 4, 4],
            [0, 8, 0, 0]
          ],
          [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 2]
          ],
          [
            [4, 8, 2, 8],
            [4, 2, 8, 2],
            [2, 8, 2, 8],
            [8, 2, 8, 2]
          ],
        ];

        var results = [
          {
            board: [
              [0,  2, 2, 4],
              [0,  4, 8, 2],
              [0, 16, 0, 4],
              [0,  0, 0, 0]
            ],
            score: 24
          },
          {
            board: [
              [0, 0, 0, 2],
              [0, 0, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0]
            ],
            score: 0
          },
          {
            board: [
              [8, 8, 2, 8],
              [2, 2, 8, 2],
              [8, 8, 2, 8],
              [0, 2, 8, 2]
            ],
            score: 8
          }
        ];

        it('moves the board up', function() {
          _.each(_.zip(boards, results), function(boardsAndResults) {
            var board = boardsAndResults[0];
            var result = boardsAndResults[1];
            expect(subject.moveBoard('up', board)).toEqual(result);
          });
        });
      });

      describe('when the board cannot move up', function() {
        var boards = [
          [
            [0, 2, 2, 4],
            [0, 4, 8, 2],
            [0, 0, 4, 4],
            [0, 0, 0, 0]
          ],
          [
            [0, 0, 0, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
          ],
          [
            [2, 8, 2, 8],
            [8, 2, 8, 2],
            [2, 8, 2, 8],
            [8, 2, 8, 2]
          ],
        ];

        it('does not move the board up', function() {
          _.each(boards, function(board) {
            expect(subject.moveBoard('up', board)).toEqual({
              board: board,
              score: 0
            });
          });
        });
      });
    });

    describe('when the direction is "down"', function() {
      describe('when the board can move down', function() {
        var boards = [
          [
            [0, 2, 2, 4],
            [0, 4, 4, 2],
            [0, 8, 4, 4],
            [0, 8, 0, 0]
          ],
          [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 2],
            [0, 0, 0, 0]
          ],
          [
            [4, 8, 2, 8],
            [4, 2, 8, 2],
            [2, 8, 2, 8],
            [8, 2, 8, 2]
          ],
        ];

        var results = [
          {
            board: [
                [0,  0, 0, 0],
                [0,  2, 0, 4],
                [0,  4, 2, 2],
                [0, 16, 8, 4]
              ],
            score: 24
          },
          {
            board: [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 2]
              ],
            score: 0
            },
          {
            board: [
                [0, 8, 2, 8],
                [8, 2, 8, 2],
                [2, 8, 2, 8],
                [8, 2, 8, 2]
              ],
            score: 8
          },
        ];

        it('moves the board down', function() {
          _.each(_.zip(boards, results), function(boardsAndResults) {
            var board = boardsAndResults[0];
            var result = boardsAndResults[1];
            expect(subject.moveBoard('down', board)).toEqual(result);
          });
        });
      });

      describe('when the board cannot move down', function() {
        var boards = [
          [
            [0, 0, 0, 8],
            [0, 0, 0, 4],
            [0, 2, 0, 2],
            [0, 4, 2, 8]
          ],
          [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 2, 0]
          ],
          [
            [2, 8, 2, 8],
            [8, 2, 8, 2],
            [2, 8, 2, 8],
            [8, 2, 8, 2]
          ],
        ];

        it('does not move the board down', function() {
          _.each(boards, function(board) {
            expect(subject.moveBoard('down', board)).toEqual({
              board: board,
              score: 0
            });
          });
        });
      });
    });

    describe('when the direction is "left"', function() {
      describe('when the board can move left', function() {
        var boards = [
          [
            [0, 2, 2, 4],
            [0, 4, 4, 2],
            [0, 8, 4, 4],
            [0, 8, 0, 0]
          ],
          [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 2]
          ],
          [
            [4, 4, 2, 8],
            [8, 2, 8, 2],
            [2, 8, 2, 8],
            [8, 2, 8, 2]
          ],
        ];

        var results = [
          {
            board: [
                [4, 4, 0, 0],
                [8, 2, 0, 0],
                [8, 8, 0, 0],
                [8, 0, 0, 0]
              ],
            score: 20
          },
          {
            board: [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [2, 0, 0, 0]
              ],
            score: 0
          },
          {
            board: [
                [8, 2, 8, 0],
                [8, 2, 8, 2],
                [2, 8, 2, 8],
                [8, 2, 8, 2]
              ],
            score: 8
          },
        ];

        it('moves the board left', function() {
          _.each(_.zip(boards, results), function(boardsAndResults) {
            var board = boardsAndResults[0];
            var result = boardsAndResults[1];
            expect(subject.moveBoard('left', board)).toEqual(result);
          });
        });
      });

      describe('when the board cannot move left', function() {
        var boards = [
          [
            [8, 2, 4, 2],
            [4, 8, 2, 0],
            [2, 8, 4, 0],
            [0, 0, 0, 0]
          ],
          [
            [2, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
          ],
          [
            [2, 8, 2, 8],
            [8, 2, 8, 2],
            [2, 8, 2, 8],
            [8, 2, 8, 2]
          ],
        ];

        it('does not move the board left', function() {
          _.each(boards, function(board) {
            expect(subject.moveBoard('left', board)).toEqual({
              board: board,
              score: 0
            });
          });
        });
      });
    });

    describe('when the direction is "right"', function() {
      describe('when the board can move right', function() {
        var boards = [
          [
            [0, 2, 2, 4],
            [0, 4, 4, 2],
            [0, 8, 4, 4],
            [0, 8, 0, 0]
          ],
          [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [2, 0, 0, 0]
          ],
          [
            [2, 8, 2, 0],
            [8, 2, 8, 2],
            [2, 8, 2, 8],
            [8, 2, 8, 2]
          ],
        ];

        var results = [
          {
            board: [
                [0, 0, 4, 4],
                [0, 0, 8, 2],
                [0, 0, 8, 8],
                [0, 0, 0, 8]
              ],
            score: 20
          },
          {
            board: [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 2]
              ],
            score: 0
          },
          {
            board: [
                [0, 2, 8, 2],
                [8, 2, 8, 2],
                [2, 8, 2, 8],
                [8, 2, 8, 2]
              ],
            score: 0
          },
        ];

        it('moves the board right', function() {
          _.each(_.zip(boards, results), function(boardsAndResults) {
            var board = boardsAndResults[0];
            var result = boardsAndResults[1];
            expect(subject.moveBoard('right', board)).toEqual(result);
          });
        });
      });

      describe('when the board cannot move right', function() {
        var boards = [
          [
            [0, 8, 2, 4],
            [0, 4, 8, 2],
            [0, 0, 2, 4],
            [0, 0, 0, 2]
          ],
          [
            [0, 0, 0, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
          ],
          [
            [2, 8, 2, 8],
            [8, 2, 8, 2],
            [2, 8, 2, 8],
            [8, 2, 8, 2]
          ],
        ];

        it('does not move the board right', function() {
          _.each(boards, function(board) {
            expect(subject.moveBoard('right', board)).toEqual({
              board: board,
              score: 0
            });
          });
        });
      });
    });

    describe('when the direction is anything else', function() {
      it('throws a BadDirectionError', function() {
        expect(function() { subject.moveBoard('dawn', []); }).toThrow({
          name: 'BadDirectionError',
          validDirections: ['up', 'down', 'left', 'right'],
          given: 'dawn'
        });
      });
    });
  });

  describe('.isGameOver', function() {
    describe('when the game is over', function() {
      var boards = [
        [
          [2, 8, 2, 8],
          [8, 2, 8, 2],
          [2, 8, 2, 8],
          [8, 2, 8, 2]
        ],
        [
          [ 256,  16, 8, 4],
          [ 512,  32, 2, 8],
          [1024,  64, 4, 2],
          [2048, 128, 8, 4]
        ],
      ];

      it('returns true', function() {
        expect(_.every(boards, subject.isGameOver)).toEqual(true);
      });
    });

    describe('when the game is not over', function() {
      var boards = [
        [
          [2, 8, 2, 2],
          [8, 2, 8, 2],
          [2, 8, 2, 8],
          [8, 2, 8, 2]
        ],
        [
          [ 256,  16, 8, 4],
          [ 512,  32, 2, 8],
          [1024,  64, 4, 2],
          [2048, 128, 8, 2]
        ],
      ];

      it('returns false', function() {
        expect(_.every(boards, subject.isGameOver)).toEqual(false);
      });
    });
  });

  describe('.emptySpaces', function() {
    var board = [
      [   0,  16, 8, 4],
      [ 512,  32, 2, 0],
      [1024,   0, 4, 2],
      [   0, 128, 0, 2]
    ];
    var expected = [
      [0, 0],
      [1, 3],
      [2, 1],
      [3, 0],
      [3, 2]
    ];

    it('returns the coordinates whose values are 0', function() {
      expect(subject.emptySpaces(board)).toEqual(expected);
    });
  });

  describe('.updatePosition', function() {
    var board = [
      [   0,  16, 8, 4],
      [ 512,  32, 2, 0],
      [1024,   0, 4, 2],
      [   0, 128, 0, 2]
    ];
    var expected = [
      [   0,  16, 8, 4],
      [ 512,  32, 2, 0],
      [1024,   7, 4, 2],
      [   0, 128, 0, 2]
    ];
    var original = _.invoke(board, 'slice');


    it('returns a copied board with the given position modifed', function() {
      expect(subject.updatePosition(2, 1, 7, board)).toEqual(expected);
      expect(board).toEqual(original);
    });
  });
});
