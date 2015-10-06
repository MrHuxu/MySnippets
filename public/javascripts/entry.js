var React = require('react');
var Menu = require('./components/Menu.react');
var List = require('./components/List.react');
var Editor = require('./components/Editor.react');

var $ = require('jquery');
window.jQuery = $; // Assure it's available globally.
var s = require('./lib/semantic.min.js');

require('../../node_modules/highlight.js/styles/solarized_dark.css');

var MySnippets = React.createClass({
  render: function  () {
    return (
      <div className='full-height'>
        <Menu />
        <div className='ui grid full-height app-area'>
          <div className='four wide column full-height'><List /></div>
          <div className='ui vertical divider'>
            Edit
          </div>
          <div className='twelve wide column'><Editor /></div>
        </div>
      </div>
    );
  }
});

React.render(<MySnippets />, document.getElementById('my-snippets'));
