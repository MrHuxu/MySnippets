import React, { Component } from 'react';
import Menu from './Menu';
import SnippetList from './SnippetList';
import SnippetEditor from './SnippetEditor';
import { connect } from 'react-redux';

const style = {
  snippetList: {
    overflowY: 'auto',
    paddingBottom: '70px'
  },

  snippetEditor: {
    borderLeft: '2px solid #ddd',
    overflowY: 'auto',
    paddingBottom: '70px'
  }
};

class App extends Component {
  render () {
    const { snack } = this.props;

    return (
      <div className='full-height'>
        <Menu />
        <div className='row'>
          <div className='col s4'>
            <SnippetList />
          </div>
          <div className='col s8'>
            <SnippetEditor />
          </div>
        </div>
      </div>
    );
  }
}

var mapStateToProps = function (state) {
  return {
    snack: state.snippet.snack
  };
};

export default connect(mapStateToProps)(App);