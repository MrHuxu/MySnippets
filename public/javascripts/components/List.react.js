require('../../stylesheets/list.css');
var React = require('react/addons');
var Editor = require('./Editor.react');
var db = require('../../../db/nedb.config');
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
      <div className='card' onClick={this.selectSnippet.bind(this, this.props.snippetId)}>
        <div className='content'>
          <div className='header'>{this.props.title}</div>
          <span className='meta'>{'@ ' + this.props.updatedAt.toLocaleString()}</span>
        </div>
        <div className="ui bottom attached button" onClick={this.deleteSnippet.bind(this, this.props.snippetId)}>
          Delete
        </div>
      </div>
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
      code: '',
      updatedAt: new Date()
    }, function (err, doc) {
      if (err)
        console.error(err)
      else {
        var tmp = _this.state.records.slice(0);
        tmp.unshift(doc);
        _this.setState({records: tmp});
      }
    });
  },

  refreshList: function () {
    var _this = this;
    db.find({}).sort({ updatedAt: -1 }).exec(function (err, docs) {
      _this.setState({records: docs});
    });
  },

  componentDidMount: function () {
    var _this = this;

    _this.refreshList();
    listEvent.on('refresh-list', function () {
      _this.refreshList();
    });
    listEvent.on('add-snippet', function () {
      _this.createSnippet();
    });
  },

  render: function () {
    var ListItems = this.state.records.map(function (doc) {
      return <ListItem snippetId={doc._id} title={doc.title} updatedAt={doc.updatedAt} />;
    });
    return (
      <div className='ui grid full-height list-area'>
        <div className="ui link cards">
          {ListItems}
        </div>
      </div>
    );
  }
});

module.exports = List;