import React, { Component } from 'react';
import Snackbar from 'material-ui/lib/snackbar';
import Menu from './Menu';
import SnippetList from './SnippetList';
import SnippetEditor from './SnippetEditor';
import { Grid, Row, Col } from 'react-flexbox-grid/lib';
import { connect } from 'react-redux';

const style = {
  snippetEditor: {
    borderLeft: '2px solid #ddd'
  }
};

class App extends Component {
  render () {
    const { snack } = this.props;

    return (
      <div className='full-height'>
        <Menu />
        <Grid fluid
          className = 'full-height'
          style     = {{
            padding: '0 10px 0 10px'
          }}
        >
          <Row className='full-height'>
            <Col
              xs        = {4}
              className ='full-height'
              style     = {{
                overflowY: 'auto',
                paddingBottom: '70px'
              }}
            >
              <SnippetList />
            </Col>

            <Col className='snippet-editor' xs={8} style={style.snippetEditor}><SnippetEditor /></Col>
          </Row>
        </Grid>
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