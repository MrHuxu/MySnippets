import React, { Component } from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

class SnippetItem extends Component {
  render () {
    const { metaData } = this.props;
    console.log(metaData);

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
          <FlatButton label="Delete" primary={true} />
        </CardActions>
      </Card>
    );
  }
}

export default SnippetItem;