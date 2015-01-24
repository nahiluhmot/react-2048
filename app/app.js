var React = require('react');
var Router = require('react-router');

Home = require('./views/home.jsx');

window.onload = function() {
  var documentRoot = document.querySelector('#app');
  var element = React.createElement(Home)

  React.render(element, documentRoot);
};
