import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import { addSnippet } from '../actions/SnippetActions';

const style = {
  margin: 12,
};

class Menu extends Component {
  constructor (props) {
    super(props);

    this.handleClickAddButton = this.handleClickAddButton.bind(this);
  }

  handleClickAddButton () {
    this.props.dispatch(addSnippet());
  }

  render () {
    return (
      <AppBar
        title = 'My Snippets'
        iconElementLeft={<IconButton onClick={this.handleClickAddButton}><ContentAdd /></IconButton>}
      >
      </AppBar>
    );
  }
}

export default connect()(Menu);