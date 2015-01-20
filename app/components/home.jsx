var React = require('react');
var Game = require('./game.jsx');

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
