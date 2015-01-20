var React = require('react');
var Router = require('react-router');

var App = require('./app.jsx');
var Home = require('./home.jsx');

var Routes = (
  <Router.Route name="app" path="/" handler={App}>
    <Router.DefaultRoute handler={Home}/>
    <Router.NotFoundRoute handler={Home}/>
  </Router.Route>
);

module.exports = Routes;
