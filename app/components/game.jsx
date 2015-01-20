var React = require('react');
var Score = require('./score.jsx');
var Tile = require('./tile.jsx');
var _ = require('underscore');

/**
 * This component con
 */
var Game = React.createClass({
  getInitialState: function () {
    return {
      score: 0,
      board: [
        [0, 0, 0 ,0],
        [0, 0, 0 ,0],
        [0, 0, 0 ,0],
        [0, 0, 0 ,0],
      ]
    };
  },

  renderTile: function(value) {
    return <Tile value={value}/>;
  },

  renderRow: function(row) {
    return (
      <div className="row">
        {row.map(this.renderTile)}
      </div>
    );
  },

  renderBoard: function(board) {
    return (
      <div className="board">
        {board.map(this.renderRow)}
      </div>
    );
  },

  render: function() {
    return (
      <div>
        <Score score={this.state.score}/>
        {this.renderBoard(this.state.board)}
      </div>
    );
  }
});

module.exports = Game;
