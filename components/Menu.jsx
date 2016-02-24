import React, { Component } from 'react';
import linkState from 'react-link-state';
import { connect } from 'react-redux';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import VerticalAlignCenter from 'material-ui/lib/svg-icons/editor/vertical-align-center';
import TextField from 'material-ui/lib/text-field';
import { createSnippet, fetchSnippets } from '../actions/SnippetActions';

const style = {
  title: {
    marginLeft: '30px',
    fontFamily: '"Roboto", sans-serif',
    color: Colors.grey50
  },

  addBtn: {
    margin: '3px 0 0 5px'
  },

  exportBtn: {
    margin: '3px 0 0 0'
  }
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
      <Toolbar style={{backgroundColor: Colors.cyan500}}>
        <ToolbarGroup firstChild={true} float='left'>
          <IconButton style={style.addBtn} onClick={this.handleClickAddButton}><ContentAdd color={Colors.blueGrey700} /></IconButton>
        </ToolbarGroup>

        <ToolbarGroup firstChild={true} float='left'>
          <ToolbarTitle style={style.title} text='My Snippets' />
        </ToolbarGroup>

        <ToolbarGroup lastChild={true} style={style.exportBtn} float='right'>
          <IconButton><VerticalAlignCenter color={Colors.deepOrange800} /></IconButton>
        </ToolbarGroup>

        <ToolbarGroup float='right'>
          <TextField hintText='Search' valueLink={linkState(this, 'condition')} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default connect()(Menu);