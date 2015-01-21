var React = require('react');

/**
 * This component represents a tile.
 */
var Tile = React.createClass({
  getDefaultProps: function() {
    return { value: 0 };
  },

  cssClassName: function() {
    return "tile-" + this.props.value;
  },

  render: function() {
    return (
      <div className={"tile" + " " + this.cssClassName()}>
        {this.props.value}
      </div>
    );
  }
});

module.exports = Tile;
