var React = require('react');
var Router = require('react-router');

var App = {};

App.Routes = require('./routes.jsx');
App.Views = require('./views.js');

window.onload = function() {
  var documentRoot = document.querySelector('#app');

  Router.run(App.Routes, function(Handler, state) {
    React.render(<Handler params={state.params}/>, documentRoot);
  });
};

module.exports = App;
