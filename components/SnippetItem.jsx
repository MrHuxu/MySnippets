import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import { destroySnippet } from '../actions/SnippetActions';

class SnippetItem extends Component {
  constructor (props) {
    super(props);

    this.handleClickDeleteButton = this.handleClickDeleteButton.bind(this);
  }

  handleClickDeleteButton (id) {
    this.props.dispatch(destroySnippet(id));
  }

  render () {
    const { metaData } = this.props;

    return (
      <Card>
        <CardHeader
          title    = {metaData.title}
          subtitle = {`@ ${metaData.time}`}
          avatar   = "http://lorempixel.com/100/100/nature/"
        />
        <CardText>
          {metaData.content.slice(0, 100)}
        </CardText>
        <CardActions>
          <FlatButton label="Delete" primary={true} onClick={this.handleClickDeleteButton.bind(null, metaData._id)} />
        </CardActions>
      </Card>
    );
  }
}

export default connect()(SnippetItem);