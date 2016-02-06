import React, { Component } from 'react';
import Menu from './Menu';
import SnippetList from './SnippetList';
import SnippetEditor from './SnippetEditor';
import { Grid, Row, Col } from 'react-flexbox-grid/lib';

class App extends Component {
  render () {
    return (
      <div>
        <Menu />
        <Grid fluid>
          <Row>
            <Col xs={4}><SnippetList /></Col>
            <Col xs={8}><SnippetEditor /></Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;