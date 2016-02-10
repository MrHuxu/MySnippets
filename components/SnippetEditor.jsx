import React, { Component } from 'react';
import linkState from 'react-link-state';
import { connect } from 'react-redux';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Paper from 'material-ui/lib/paper';
import { Grid, Row, Col } from 'react-flexbox-grid/lib';
import { updateSnippet } from '../actions/SnippetActions';

const style = {
  global: {
    margin: '10px 0 0 0'
  }
};

const langs = {
  javascript : 'Javascript',    
  ruby       : 'Ruby',   
  css        : 'CSS',   
  html       : 'HTML',    
  mysql      : 'SQL',   
  markdown   : 'Markdown'
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
  }

  handleChange (event, index, value) {
    this.setState({ lang: value });
  }

  componentWillReceiveProps (props) {
    const { dispatch, selectedId, snippet } = props;
    if (snippet) this.setState(snippet);
    if (this.props) {
      dispatch(updateSnippet({
        _id: this.props.selectedId,
      }, Object.assign(this.state, {
        time: (new Date()).toLocaleString()
      })));
    }
  }

  render () {
    const { selectedId, snippet } = this.props;
    const menuItems = Object.keys(langs).map(key => <MenuItem key={key} value={key} primaryText={langs[key]}/>)
    const editArea = (
      <TextField
        floatingLabelText = "Snippet Content"
        multiLine         = {true}
        rows              = {15}
        rowsMax           = {15}
        fullWidth         = {true}
        label             = {'hehe'}
        valueLink         = {linkState(this, 'content')}
      />
    );

    return selectedId ? (
      <Grid fluid style={style.global}>
        <Row>

          <Col xs={6}>
            <TextField
              hintText          = "Title"
              valueLink         = {linkState(this, 'title')}
              floatingLabelText = "Enter Title"
            />
          </Col>

          <Col xs={6}>
            <SelectField
              floatingLabelText = "Select Language"
              value             = {this.state.lang}
              onChange          = {this.handleChange}
            >
              {menuItems}
            </SelectField>
          </Col>

          <Col xs={12}>
            {editArea}
          </Col>

        </Row>
      </Grid>
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