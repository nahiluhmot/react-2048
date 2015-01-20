var React = require('react');

/**
 * This component is used to keep the score for the game, which defaults to 0.
 */
var Score = React.createClass({
  getDefaultProps: function() {
    return { score: 0 };
  },

  render: function() {
    return (
      <div>
        Score: {this.props.score}
      </div>
    );
  }
});

module.exports = Score;
