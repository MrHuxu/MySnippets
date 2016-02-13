import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Dialog from 'material-ui/lib/dialog';
import { destroySnippet } from '../actions/SnippetActions';

const langIcons = {
  css        : require('../vendor/lang-icons/css.svg'),
  javascript : require('../vendor/lang-icons/javascript.svg'),
  markdown   : require('../vendor/lang-icons/markdown.svg'),
  ruby       : require('../vendor/lang-icons/ruby.svg'),
  sql        : require('../vendor/lang-icons/sql.svg'),
  xml        : require('../vendor/lang-icons/xml.svg')
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

  handleCloseDialog (id, confirm) {
    this.setState({
      openDialog: false
    });
    if (confirm) this.props.dispatch(destroySnippet(id));
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
        onTouchTap      = {this.handleCloseDialog.bind(null, metaData._id, false)}
      />,
      <FlatButton
        label      = "Submit"
        primary    = {true}
        onTouchTap = {this.handleCloseDialog.bind(null, metaData._id, true)}
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
          title   = "Dialog With Actions"
          open    = {this.state.openDialog}
          actions = {dialogActions}
        >
          The actions in this window were passed in as an array of React objects.
        </Dialog>
      </div>
    );
  }
}

export default connect()(SnippetItem);