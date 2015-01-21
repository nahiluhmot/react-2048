var Errors = {
  /**
   * Raised when an invalid direction is passed to a function.
   */
  badDirectionError: function(dir) {
    return {
      name: 'BadDirectionError',
      validDirections: ['up', 'down', 'left', 'right'],
      given: dir
    };
  }
};

module.exports = Errors;
