require('../stylesheets/editor.css')
var React = require('react/addons');
var hljs = require('highlight.js');
var $ = require('jquery');
var db = require('../../db/nedb.config');
var snippetEvent = require('../events').snippetEvent;

var Editor = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function () {
    return {
      title: '',
      lang: 'javascript',
      tags: [],
      code: ''
    };
  },

  toEdit: function () {
    $('.code-dist').hide();
    $('.code-src').show().focus();
  },

  toShow: function () {
    if (this.state.code.length) {
      $('.code-src').hide();
      $('.code-dist').show();
    }
  },

  componentDidMount: function () {
    var _this = this;

    $('.code-src').blur(function () {
      _this.toShow();
    });

    snippetEvent.on('select-snippet', function (id) {
      db.findOne({_id: id}, function (err, doc) {
        if (err)
          console.error(err);
        else {
          _this.setState({
            title: doc.title,
            lang: doc.lang,
            code: doc.code
          });
        }
      })
    })
  },

  componentWillUnmount: function () {
  },

  render: function () {
    var highlightResult = this.state.lang ? hljs.highlight(this.state.lang, this.state.code) : hljs.highlightAuto(this.state.code);
    return (
      <div>
        <div>
          <select valueLink={this.linkState('lang')}>
            <option value='ruby'>Ruby</option>
            <option value='javascript'>Javascript</option>
            <option value='css'>CSS</option>
            <option value='html'>HTML</option>
            <option value='sql'>SQL</option>
            <option value='nginx'>Nginx</option>
            <option value='markdown'>Markdown</option>
          </select>
        </div>
        <input valueLink={this.linkState('title')} />
        <textarea className='code-src' rows='25' cols='80' valueLink={this.linkState('code')}></textarea>
        <div className='code-dist' onClick={this.toEdit.bind(this)}>
          <span dangerouslySetInnerHTML={{__html: highlightResult.value}} />
        </div>
        <p>{this.state.lang}</p>
      </div>
    );
  }
});

module.exports = Editor;