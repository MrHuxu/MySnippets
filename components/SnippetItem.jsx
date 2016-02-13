import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
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
      open: false,
    };

    this.handleClickDeleteButton = this.handleClickDeleteButton.bind(this);
  }

  handleClickDeleteButton (id) {
    this.props.dispatch(destroySnippet(id));
    this.setState({
      open: true,
    });
  }

  render () {
    const { metaData } = this.props;

    const iconPath = ((process.env.NODE_ENV && process.env.NODE_ENV === 'development') ? '' : '../vendor/built/') + langIcons[metaData.lang];

    return (
      <Card>
        <CardHeader
          title    = {metaData.title}
          subtitle = {`@ ${metaData.time.toLocaleString()}`}
          avatar   = {iconPath}
        />
        <CardText>
          {metaData.content && metaData.content.slice(0, 100)}
        </CardText>
        <CardActions>
          <FlatButton label="Delete" primary={true} onClick={this.handleClickDeleteButton.bind(null, metaData._id)} />
        </CardActions>
      </Card>
    );
  }
}

export default connect()(SnippetItem);