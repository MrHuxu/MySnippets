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
      <div className="card darken-1 waves-effect">
        <div className="card-content">
          <div className='row'>
            <div className='col s2'>icon</div>
            <div className='col s10'>
              <p className='blue-grey-text text-darken-2'>{metaData.title}</p>
              <p className='blue-grey-text text-lighten-2'>{`@ ${metaData.time.toLocaleString()}`}</p>
            </div>
          </div>
          <p className='grey-text text-darken-2'>{metaData.content}</p>
        </div>
        <div className="card-action">
          <a
            className = "waves-effect waves-red btn-flat"
          >
            Delete
          </a>
        </div>
      </div>
    ) : (
      <div className="card darken-1 waves-effect">
        <div className="card-content">
          <div className='row'>
            <div className='col s2'>icon</div>
            <div className='col s7'>
              <p className='blue-grey-text text-darken-2'>{metaData.title}</p>
              <p className='blue-grey-text text-lighten-2'>{`@ ${metaData.time.toLocaleString()}`}</p>
            </div>
            <div className='col s3'>
              <a
                className = "waves-effect waves-red btn-flat"
              >
                <i className='material-icons'>delete</i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(SnippetItem);