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
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
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
      condition        : '',
      openExportDialog : false
    };

    this.handleClickAddButton = this.handleClickAddButton.bind(this);
    this.handleClickExportButton = this.handleClickExportButton.bind(this);
    this.closeExportDialog = this.closeExportDialog.bind(this);
  }

  handleClickAddButton () {
    this.props.dispatch(createSnippet());
  }

  handleClickExportButton () {
    this.setState({ openExportDialog: true });
  }

  closeExportDialog () {
    this.setState({ openExportDialog: false });
  }

  shouldComponentUpdate (props, state) {
    props.dispatch(fetchSnippets({
      title: new RegExp(state.condition, 'i')
    }, { updateSelectedId: true }));
    return true;
  }

  render () {
    const actions = [
      <FlatButton
        label      = "Import"
        secondary  = {true}
        onTouchTap = {this.closeExportDialog}
      />,
      <FlatButton
        label      = "Export"
        primary    = {true}
        onTouchTap = {this.closeExportDialog}
      />,
    ];
    return (
      <Toolbar style={{backgroundColor: Colors.cyan500}}>
        <ToolbarGroup firstChild={true} float='left'>
          <IconButton style={style.addBtn} onClick={this.handleClickAddButton}><ContentAdd color={Colors.blueGrey700} /></IconButton>
        </ToolbarGroup>

        <ToolbarGroup firstChild={true} float='left'>
          <ToolbarTitle style={style.title} text='My Snippets' />
        </ToolbarGroup>

        <ToolbarGroup lastChild={true} style={style.exportBtn} float='right'>
          <IconButton onClick={this.handleClickExportButton}><VerticalAlignCenter color={Colors.deepOrange800} /></IconButton>
          <Dialog
            title          = 'Import or Export'
            modal          = {false}
            actions        = {actions}
            open           = {this.state.openExportDialog}
            onRequestClose = {this.closeExportDialog}
          >
            Import data from .json file or export data to json.
          </Dialog>
        </ToolbarGroup>

        <ToolbarGroup float='right'>
          <TextField hintText='Search' valueLink={linkState(this, 'condition')} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default connect()(Menu);