var React = require('react');
var Router = require('react-router');
var Routes = require('./components/routes.jsx')

Router.run(Routes, function(Handler, state) {
  var documentRoot = document.querySelector('#app');
  React.render(React.createElement(Handler, state.params), documentRoot);
});
