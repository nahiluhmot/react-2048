var React = require('react');
var Game = require('./game.jsx');

/**
 * This component is a simple wrapper around the Game.
 */
var Home = React.createClass({
  render: function() {
    return (
      <div className="center">
        <h1>Welcome to 2048!</h1>
        <Game/>
      </div>
    );
  }
});

module.exports = Home;
