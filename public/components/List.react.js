var React = require('react/addons');
var Editor = require('./Editor.react');
var db = require('../../db/nedb.config');
var listEvent = require('../events').listEvent;
var snippetEvent = require('../events').snippetEvent;

var ListItem = React.createClass({
  deleteSnippet: function (id) {
    db.remove({_id: id}, function (err, num) {
      if (err)
        console.error(err);
      else {
        listEvent.emit('refresh-list');
      }
    });
  },

  selectSnippet: function (id) {
    snippetEvent.emit('select-snippet', id);
  },

  render: function () {
    return (
      <li>
        <button onClick={this.selectSnippet.bind(this, this.props.snippetId)}>{this.props.title + ' (id: ' + this.props.snippetId + ')'}</button>
        <button onClick={this.deleteSnippet.bind(this, this.props.snippetId)}>-</button>
      </li>
    );
  }
});

var List = React.createClass({
  getInitialState: function () {
    return {
      records: []
    };
  },

  createSnippet: function () {
    var _this = this;
    db.insert({
      title: 'Untitled Snippet',
      lang: 'javascript',
      tags: [],
      code: ''
    }, function (err, doc) {
      if (err)
        console.error(err)
      else {
        var tmp = _this.state.records.slice(0);
        tmp.push(doc);
        _this.setState({records: tmp});
      }
    });
  },

  refreshList: function () {
    var _this = this;
    db.find({}, function (err, docs) {
      _this.setState({records: docs});
    });
  },

  componentDidMount: function () {
    var _this = this;
    _this.refreshList();
    listEvent.on('refresh-list', function () {
      _this.refreshList();
    });
  },

  render: function () {
    var ListItems = this.state.records.map(function (doc) {
      return <ListItem snippetId={doc._id} title={doc.title} />;
    });
    return (
      <div>
        <button onClick={this.createSnippet.bind(this)}>+</button>
        <ul>
          {ListItems}
        </ul>
      </div>
    );
  }
});

module.exports = List;