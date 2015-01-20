var React = require('react');
var Router = require('react-router');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Router.RouteHandler/>
      </div>
    );
  }
});

module.exports = App;
