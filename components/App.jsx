import React, { Component } from 'react';
import Menu from './Menu';
import List from './List';
import Editor from './Editor';
import { Grid, Row, Col } from 'react-flexbox-grid/lib';

class App extends Component {
  render () {
    return (
      <div>
        <Menu />
        <Grid fluid>
          <Row>
            <Col xs={4}>List</Col>
            <Col xs={8}>Editor</Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;