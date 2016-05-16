import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import Menu from './Menu';
import SnippetList from './SnippetList';
import SnippetEditor from './SnippetEditor';
import { connect } from 'react-redux';

const style = {
  snippetList: {
    overflowY : 'auto',
    width     : '30%',
    display   : 'inline-block'
  },

  snippetEditor: {
    borderLeft : '2px solid #ddd',
    overflowY  : 'auto',
    width      : '68%',
    display    : 'inline-block'
  }
};

class App extends Component {
  render () {
    const { snack } = this.props;

    return (
      <div className='full-height'>
        <Menu />
        <div className='full-height'>
          <div
            className = 'full-height'
            style     = {style.snippetList}
          >
            <SnippetList />
          </div>

          <div
            className = 'full-height'
            style     = {style.snippetEditor}
          >
            <SnippetEditor />
          </div>
        </div>

        <Snackbar
          open             = {snack.open}
          message          = {`"${snack.message}" was deleted.`}
          autoHideDuration = {4000}
          onRequestClose   = {null}
        />
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