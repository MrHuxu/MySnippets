import $ from 'jquery';
import React, { Component } from 'react';
import linkState from 'react-link-state';
import { connect } from 'react-redux';
import CodeMirror from 'react-codemirror';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import { updateSnippet } from '../actions/SnippetActions';

const style = {
  global: {
    margin  : '10px 0 0 0',
    padding : '0 0 70px 0'
  },

  title: {
    width   : '40%',
    display : 'inline-block',
    margin  : '0 0 0 20px'
  },

  lang: {
    width         : '48%',
    display       : 'inline-block',
    margin        : '0 0 0 20px',
    verticalAlign : 'top'
  },

  contentArea: {
    margin: '20px 0 0 20px'
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

  render () {
    const { selectedId, snippet } = this.props;
    const menuItems = Object.keys(langs).map(key => <MenuItem key={key} value={langs[key]} primaryText={key}/>);

    const codeMirrorOptions = {
      theme           : 'solarized',
      indentUnit      : 2,
      tabSize         : 2,
      lineNumbers     : true,
      lineWiseCopyCut : true,
      mode            : this.state.lang
    };

    return selectedId ? (
      <div style={style.global}>

          <div style={style.title}>
            <TextField
              hintText          = "Title"
              valueLink         = {linkState(this, 'title')}
              floatingLabelText = "Enter Title"
              onBlur            = {this.updateCurrentSnippet}
            />
          </div>

          <div style={style.lang}>
            <SelectField
              floatingLabelText = "Select Language"
              value             = {this.state.lang}
              onChange          = {this.handleChange}
            >
              {menuItems}
            </SelectField>
          </div>

          <div style={style.contentArea}>
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