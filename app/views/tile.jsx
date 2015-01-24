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

  showValue: function() {
    if (this.props.value !== 0) {
      return this.props.value;
    }
  },

  render: function() {
    return (
      <div className={"tile" + " " + this.cssClassName()}>
        {this.showValue()}
      </div>
    );
  }
});

module.exports = Tile;
