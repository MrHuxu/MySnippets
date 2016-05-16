import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { destroySnippet } from '../actions/SnippetActions';

const langIcons = {
  css        : require('../vendor/lang-icons/css.svg'),
  javascript : require('../vendor/lang-icons/javascript.svg'),
  markdown   : require('../vendor/lang-icons/markdown.svg'),
  ruby       : require('../vendor/lang-icons/ruby.svg'),
  sql        : require('../vendor/lang-icons/sql.svg'),
  xml        : require('../vendor/lang-icons/xml.svg'),
  shell      : require('../vendor/lang-icons/shell.svg')
};

class SnippetItem extends Component {
  constructor (props) {
    super(props);
    this.state = {
      openDialog: false
    };

    this.handleClickDeleteButton = this.handleClickDeleteButton.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleCloseDialog (id, title, confirm) {
    this.setState({
      openDialog: false
    });
    if (confirm) this.props.dispatch(destroySnippet({
      _id   : id,
      title : title
    }));
  }

  handleClickDeleteButton (id) {
    this.setState({
      openDialog: true
    });
  }

  render () {
    const { metaData, expand } = this.props;

    const snippetDetail = (
      <CardText>
        {metaData.content && metaData.content.slice(0, 100)}
      </CardText>
    );
    const snippetAction = (
      <CardActions>
        <FlatButton label="Delete" primary={true} onClick={this.handleClickDeleteButton} />
      </CardActions>
    )
    const dialogActions = [
      <FlatButton
        label           = "Cancel"
        secondary       = {true}
        keyboardFocused = {true}
        onTouchTap      = {this.handleCloseDialog.bind(null, metaData._id, metaData.title, false)}
      />,
      <FlatButton
        label      = "Delete"
        primary    = {true}
        onTouchTap = {this.handleCloseDialog.bind(null, metaData._id, metaData.title, true)}
      />,
    ];

    return (
      <div>
        <Card>
          <CardHeader
            title    = {metaData.title}
            subtitle = {`@ ${metaData.time.toLocaleString()}`}
            avatar   = {langIcons[metaData.lang]}
          />
          {expand ? snippetDetail : null}
          {expand ? snippetAction : null}
        </Card>
        <Dialog
          title   = "Delete Confirmation"
          open    = {this.state.openDialog}
          actions = {dialogActions}
        >
          Are you sure to delete '{metaData.title}'?
        </Dialog>
      </div>
    );
  }
}

export default connect()(SnippetItem);