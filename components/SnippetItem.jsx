import React, { Component } from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

class SnippetItem extends Component {
  render () {
    return (
      <Card>
        <CardHeader
          title="URL Avatar"
          subtitle="@ 2015/01/07"
          avatar="http://lorempixel.com/100/100/nature/"
        />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </CardText>
        <CardActions>
          <FlatButton label="Delete" primary={true} />
        </CardActions>
      </Card>
    );
  }
}

export default SnippetItem;