require('../../stylesheets/list.css');
var React = require('react/addons');
var Editor = require('./Editor.react');
var db = require('../../../db/nedb.config');
var listEvent = require('../events').listEvent;
var snippetEvent = require('../events').snippetEvent;

var Menu = React.createClass({
  addSnippet: function () {
    listEvent.emit('add-snippet');
  },

  render: function () {
    return (
      <div className='ui inverted segment'>
        <div className='ui inverted secondary menu'>
          <h3 className='active item'>
            {'{ My Snippets }'}
          </h3>
          <a className='item' onClick={this.addSnippet.bind(this)}>
            + New Snippet
          </a>
        </div>
      </div>
    );
  }
})

module.exports = Menu;