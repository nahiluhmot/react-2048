var GameService = rootRequire('services/game_service.js');

describe('GameService', function() {
  describe('.reverse', function() {
    var subject = [1, 2, 3, 4];

    it('returns a copy of the given list in reverse order', function() {
      expect(GameService.reverse(subject)).toEqual([4, 3, 2, 1]);
      expect(subject).toEqual([1, 2, 3, 4]);
    });
  });
});
