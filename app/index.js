
var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');
var App = require('./components/App');

ReactDOM.render(
<div className='shell'>
    <App />
</div>,
  document.getElementById('app')

);