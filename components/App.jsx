import React, { Component } from 'react';
import Menu from './Menu';
import SnippetList from './SnippetList';
import SnippetEditor from './SnippetEditor';
import { Grid, Row, Col } from 'react-flexbox-grid/lib';

const style = {
  snippetEditor: {
    borderLeft: '2px solid #ddd'
  }
};

class App extends Component {
  render () {
    return (
      <div className='full-height'>
        <Menu />
        <Grid className='full-height grid-container' fluid>
          <Row className='full-height'>
            <Col className='snippet-list full-height' xs={4}><SnippetList /></Col>
            <Col className='snippet-editor' xs={8} style={style.snippetEditor}><SnippetEditor /></Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;