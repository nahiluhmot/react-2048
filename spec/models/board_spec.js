var Board = rootRequire('models/board.js');

describe('Board', function() {
  var elems = [
    [ 0,  1,  2,  3],
    [ 4,  5,  6,  7],
    [ 8,  9, 10, 11],
    [12, 13, 14, 15],
  ];
  var subject = new Board(elems);

  describe('#rows', function() {
    it('returns an Array of the rows', function() {
      expect(subject.rows()).toEqual(elems);
    });
  });

  describe('#cols', function() {
    var cols = [
      [ 0,  4,  8, 12],
      [ 1,  5,  9, 13],
      [ 2,  6, 10, 14],
      [ 3,  7, 11, 15],
    ];

    it('returns that row', function() {
      expect(subject.cols()).toEqual(cols);
    });
  });
});
