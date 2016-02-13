import React, { Component } from 'react';
import linkState from 'react-link-state';
import { connect } from 'react-redux';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import TextField from 'material-ui/lib/text-field';
import { createSnippet, fetchSnippets } from '../actions/SnippetActions';

const style = {
  margin: 12,
};

class Menu extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      condition: ''
    };

    this.handleClickAddButton = this.handleClickAddButton.bind(this);
  }

  handleClickAddButton () {
    this.props.dispatch(createSnippet());
  }

  shouldComponentUpdate (props, state) {
    props.dispatch(fetchSnippets({
      title: new RegExp(state.condition, 'i')
    }, { updateSelectedId: true }));
    return true;
  }

  render () {
    return (
      <AppBar
        title = 'My Snippets'
        iconElementLeft={<IconButton onClick={this.handleClickAddButton}><ContentAdd /></IconButton>}
        iconElementRight={<TextField hintText='Search' valueLink={linkState(this, 'condition')} />}
      >
      </AppBar>
    );
  }
}

export default connect()(Menu);