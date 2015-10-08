require('../../stylesheets/editor.css');
var React = require('react/addons');
var hljs = require('highlight.js');
var $ = require('jquery');
var db = require('../../../db/nedb.config');
var listEvent = require('../events').listEvent;
var snippetEvent = require('../events').snippetEvent;

window.jQuery = $; // Assure it's available globally.
var s = require('../lib/semantic.min.js');

var Editor = React.createClass({
  snippetID: null,
  mixins: [React.addons.LinkedStateMixin],
  languageNames: {
    ruby       : 'Ruby',
    javascript : 'Javascript',
    css        : 'CSS',
    html       : 'HTML',
    sql        : 'SQL',
    markdown   : 'Markdown'
  },

  getInitialState: function () {
    return {
      title: '',
      lang: '',
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

  saveToDB: function () {
    var _this = this;

    db.update({_id: _this.snippetID}, {
      title: _this.state.title,
      lang: _this.state.lang,
      code: _this.state.code,
      updatedAt: new Date()
    }, function (err) {
      _this.toShow();
      listEvent.emit('refresh-list');
    });
  },

  bindEvents: function () {
    var _this = this;

    $('.code-src').blur(function () {
      _this.saveToDB();
    });

    $('.ui.dropdown')
      .dropdown('set selected', _this.state.lang)
      .dropdown({
        on: 'hover',
        onChange: function (value) {
          _this.setState({lang: value});
        }
      });
  },

  componentDidMount: function () {
    var _this = this;

    snippetEvent.on('select-snippet', function (id) {
      _this.snippetID = id;
      db.findOne({_id: id}, function (err, doc) {
        if (err)
          console.error(err);
        else {
          _this.setState({
            title: doc.title,
            lang: doc.lang,
            code: doc.code
          });

          if (_this.state.code && _this.state.code.length)
            _this.toShow();
          else
            _this.toEdit();
        }
      })
    });

    _this.bindEvents();
  },

  componentDidUpdate: function () {
    this.bindEvents();
  },

  render: function () {
    var _this = this;

    var highlightResult = this.state.lang ? hljs.highlight(this.state.lang, this.state.code) : hljs.highlightAuto(this.state.code);
    var languageOptions = Object.keys(_this.languageNames).map(function (language) {
      return (
        <div className='item' data-value={language}>{_this.languageNames[language]}</div>
      )
    });

    var editorArea = (
      <div className='editor-area'>
        <div className='ui grid'>
          <div className='one wide column' />
          <div className='seven wide column'>
            <div className='ui input'>
              <input type='text' valueLink={this.linkState('title')} />
            </div>
          </div>
          <div className='eight wide column'>
            <div className='ui selection dropdown'>
              <input type='hidden' name='gender' />
              <i className='dropdown icon'></i>
              <div className="default text">Choose Language</div>
              <div className='menu'>
                {languageOptions}
              </div>
            </div>
          </div><br /><br />
          <div className='one wide column' />
          <div className='fourteen wide column'>
            <div className='ui piled segments'>
              <textarea className='code-src' rows='25' cols='80' valueLink={this.linkState('code')}></textarea>
              <div className='code-dist' onClick={this.toEdit.bind(this)}>
                <span dangerouslySetInnerHTML={{__html: highlightResult.value}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return this.snippetID ? editorArea : null;
  }
});

module.exports = Editor;