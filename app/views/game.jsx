var React = require('react');
var _ = require('underscore');

var Score = require('./score.jsx');
var Tile = require('./tile.jsx');
var GameService = require('../game_service.js');

/**
 * This component contains the logic to draw the game and handle keyboard
 * events.
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
      ],
      gameOver: false
    };
  },

  addRandomElement: function(board) {
    var empties = GameService.emptySpaces(board);
    var coord = _.shuffle(empties)[0];
    var elem = (Math.random() > 0.75) ? 4 : 2;
    return GameService.updatePosition(coord[0], coord[1], elem, board);
  },

  componentWillMount: function() {
    var component = this;
    var newBoard = this.state.board;
    _(2).times(function() {
      newBoard = component.addRandomElement(newBoard);
    });
    this.setState({ board: newBoard });
    document.addEventListener('keydown', this.handleKey);
  },

  componentWillUnmount: function() {
    document.removeEventListener('keydown', this.handleKey);
  },

  handleKey: function(event) {
    var direction;
    var newBoard = this.state.board;
    var newScore = this.state.score;

    if (event.keyCode === 37) {
      direction = 'left';
    } else if (event.keyCode === 38) {
      direction = 'up';
    } else if (event.keyCode === 39) {
      direction = 'right';
    } else if (event.keyCode === 40) {
      direction = 'down';
    }

    if (direction && GameService.canBoardMove(direction, newBoard)) {
      result =  GameService.moveBoard(direction, newBoard);
      newBoard = result.board;
      newBoard = this.addRandomElement(newBoard);
      newScore = result.score + newScore;
    }

    this.setState({
      board: newBoard,
      score: newScore,
      gameOver: GameService.isGameOver(newBoard)
    });
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

  renderGameOver: function() {
    if (this.state.gameOver) {
      return (
        <p>Game Over!</p>
      );
    }
  },

  render: function() {
    return (
      <div>
        <Score score={this.state.score}/>
        {this.renderGameOver()}
        {this.renderBoard(this.state.board)}
      </div>
    );
  }
});

module.exports = Game;
