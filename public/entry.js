var React = require('react');
var List = require('./components/List.react');
var Editor = require('./components/Editor.react');

var MySnippets = React.createClass({
  render: function  () {
    return (
      <div>
        <List />
        <Editor />
      </div>
    );
  }
});

React.render(<MySnippets />, document.getElementById('my-snippets'));
