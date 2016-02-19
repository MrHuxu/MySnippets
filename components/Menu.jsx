import React, { Component } from 'react';
import linkState from 'react-link-state';
import { connect } from 'react-redux';
import { createSnippet, fetchSnippets } from '../actions/SnippetActions';

const style = {
  margin: 12,
};

class Menu extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      condition: ''
    };

    this.handleClickAddButton = this.handleClickAddButton.bind(this);
  }

  handleClickAddButton () {
    this.props.dispatch(createSnippet());
  }

  shouldComponentUpdate (props, state) {
    props.dispatch(fetchSnippets({
      title: new RegExp(state.condition, 'i')
    }, { updateSelectedId: true }));
    return true;
  }

  render () {
    return (
      <nav>
        <div className='nav-wrapper'>
          <a className='left waves-effect waves-teal btn-flat'><i className='material-icons'>add</i></a>
          <span className='left brand-logo'>My Snippets</span>
          <div className='right input-field'>
            <input id='search' type='search' required placeholder='Search...' />
            <label for='search'></label>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect()(Menu);