import $ from 'jquery';
import React, { Component } from 'react';
import linkState from 'react-link-state';
import { connect } from 'react-redux';
import CodeMirror from 'react-codemirror';
import { updateSnippet } from '../actions/SnippetActions';

const style = {
  global: {
    margin: '10px 0 0 0'
  },

  contentArea: {
    margin: '20px 0 0 0'
  }
};

const langs = {
  JavaScript : 'javascript',
  Ruby       : 'ruby',
  CSS        : 'css',
  Shell      : 'shell',
  XML        : 'xml',
  SQL        : 'sql',
  Markdown   : 'markdown'
};

class SnippetEditor extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title   : null,
      lang    : null,
      content : null
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateCode = this.updateCode.bind(this);
    this.checkSnippetChanged = this.checkSnippetChanged.bind(this);
    this.updateCurrentSnippet = this.updateCurrentSnippet.bind(this);
  }

  handleChange (event, index, value) {
    this.state.lang = value;
    this.forceUpdate();
    this.updateCurrentSnippet();
  }

  checkSnippetChanged () {
    if (this.props) {
      const { snippet } = this.props;

      return snippet && !(
        this.state.title   === snippet.title &&
        this.state.lang    === snippet.lang &&
        this.state.content === snippet.content
      );
    } else {
      return false;
    }
  }

  updateCode (newContent) {
    this.state.content = newContent;
    this.updateCurrentSnippet();
  }

  updateCurrentSnippet () {
    if (this.checkSnippetChanged()) {
      const { dispatch } = this.props;

      dispatch(updateSnippet({
        _id: this.props.selectedId,
      }, Object.assign(this.state, {
        time: new Date()
      })));
    }
  }

  componentWillReceiveProps (props) {
    const { dispatch, selectedId, snippet } = props;
    if (snippet) this.setState(snippet);
  }

  componentDidUpdate () {
    $('select').material_select();
  }

  render () {
    const { selectedId, snippet } = this.props;
    //const menuItems = Object.keys(langs).map(key => <MenuItem key={key} value={langs[key]} primaryText={key}/>)

    const codeMirrorOptions = {
      theme           : 'solarized',
      indentUnit      : 2,
      tabSize         : 2,
      lineNumbers     : true,
      lineWiseCopyCut : true,
      mode            : this.state.lang
    };

    return selectedId ? (
      <div className='row'>

        <div className="input-field col s6">
          <input
            id        = "last_name"
            type      = "text"
            className = "validate"
            valueLink = {linkState(this, 'title')}
            onBlur    = {this.updateCurrentSnippet}
            />
          <label htmlFor="last_name">Enter Title</label>
        </div>

        <div className="input-field col s6">
          <select>
            <option value="" disabled>Choose your option</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
          <label>Materialize Select</label>
        </div>

        <div className='col s12' style={{marginTop: '30px'}}>
          <CodeMirror
            value    = {this.state.content}
            onChange = {this.updateCode}
            options  = {codeMirrorOptions}
          />
        </div>

      </div>
    ) : null;
  }
}

var mapStateToProps = function (state) {
  return {
    selectedId : state.snippet.selectedId,
    snippet    : state.snippet.entities[state.snippet.selectedId]
  };
};

export default connect(mapStateToProps)(SnippetEditor);