import React, { Component } from 'react';
import linkState from 'react-link-state';
import { connect } from 'react-redux';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import * as Colors from 'material-ui/styles/colors';
import ContentAdd from 'material-ui/svg-icons/content/add';
import VerticalAlignCenter from 'material-ui/svg-icons/editor/vertical-align-center';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { createSnippet, fetchSnippets, importSnippets } from '../actions/SnippetActions';

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
    this.openFileDialog = this.openFileDialog.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.importDataFromJson = this.importDataFromJson.bind(this);
    this._updateConditon = this._updateConditon.bind(this);
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

  openFileDialog () {
    var fileUploadDom = React.findDOMNode(this.refs.fileUpload);
    fileUploadDom.click();
  }

  handleFileChange (evt) {
    var file = evt.target.files[0];
    evt.target.value = '';
    var fileReader = new FileReader();
    fileReader.onload = (e) => { 
      var data = e.target.result;
      this.importDataFromJson(data);
    };
    fileReader.readAsText(file);
  }

  importDataFromJson (data) {
    this.props.dispatch(importSnippets(JSON.parse(data)));
  }

  _updateConditon (value) {
    this.setState({ condition: value });
  }

  shouldComponentUpdate (props, state) {
    if (this.state !== state) {
      props.dispatch(fetchSnippets({
        title: new RegExp(state.condition, 'i')
      }, { updateSelectedId: true }));
      return true;
    } else {
      return false;
    }
  }

  render () {
    const { records } = this.props;
    var exportBlob = new Blob([JSON.stringify(records, null, 2)], {type : 'application/json'});
    var exportURL = URL.createObjectURL(exportBlob);

    const actions = [
      <div>
        <FlatButton
          label            = 'Import'
          secondary        = {true}
          onTouchTap       = {this.closeExportDialog}
          onClick          = {this.openFileDialog}
        />
      </div>,
      <FlatButton
        label            = 'Export'
        primary          = {true}
        onTouchTap       = {this.closeExportDialog}
        linkButton       = {true}
        containerElement = {<a href={exportURL} download={`My Snippets ${(new Date).toLocaleString()}`} />}
      />
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
          <input
            ref      = 'fileUpload'
            type     = 'file'
            style    = {{'display' : 'none'}}
            onChange = {this.handleFileChange}
          />
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
          <TextField hintText='Search' onChange={this._updateConditon} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

var mapStateToProps = function (state) {
  var records = state.snippet.ids.map(id => state.snippet.entities[id]);
  var recordsWithoutIds = records.map(record => {
    var copy = Object.assign({}, record);
    delete copy._id;
    return copy;
  });
  return {
    records: recordsWithoutIds
  };
};

export default connect(mapStateToProps)(Menu);