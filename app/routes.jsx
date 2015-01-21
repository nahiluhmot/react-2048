var React = require('react');
var Router = require('react-router');

var Views = require('./views.js');

var Routes = (
  <Router.Route name="app" path="/" handler={Views.App}>
    <Router.DefaultRoute handler={Views.Home}/>
    <Router.NotFoundRoute handler={Views.Home}/>
  </Router.Route>
);

module.exports = Routes;
