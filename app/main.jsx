var React = require('react');
var Router = require('react-router');
var Routes = require('./routes.jsx')

window.onload = function() {
  var documentRoot = document.querySelector('#app');

  Router.run(Routes, function(Handler, state) {
    React.render(<Handler params={state.params}/>, documentRoot);
  });
};
