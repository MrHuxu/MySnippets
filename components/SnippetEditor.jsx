import React, { Component } from 'react';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { Grid, Row, Col } from 'react-flexbox-grid/lib';

const style = {
  global: {
    margin: '10px 0 0 0'
  }
};

const langs = {
  ruby       : 'Ruby',   
  javascript : 'Javascript',    
  css        : 'CSS',   
  html       : 'HTML',    
  sql        : 'SQL',   
  markdown   : 'Markdown'
};

class SnippetEditor extends Component {
  constructor (props) {
    super(props);
    this.state = {value: null};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event, index, value) {
    this.setState({value});
  }

  render () {
    const menuItems = Object.keys(langs).map(key => <MenuItem value={key} primaryText={langs[key]}/>)
    return (
      <Grid fluid style={style.global}>
        <Row>
          <Col xs={6}>
            <TextField hintText="Title Field" floatingLabelText="Title" />
          </Col>
          <Col xs={6}>
            <SelectField floatingLabelText="Language" value={this.state.value} onChange={this.handleChange}>
              {menuItems}
            </SelectField>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default SnippetEditor;