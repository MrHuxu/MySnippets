import React, { Component } from 'react';
import { connect } from 'react-redux';
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

    return expand ? (
      <a href="#!" className='collection-item'>
        {metaData.title}
      </a>
    ) : (
      <h1 className='collection-item'>hehe</h1>
    );
  }
}

export default connect()(SnippetItem);