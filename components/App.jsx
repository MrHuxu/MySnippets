import React, { Component } from 'react';
import Menu from './menu.jsx';
import { Grid, Row, Col } from 'react-flexbox-grid/lib';

class App extends Component {
  render () {
    return (
      <div>
        <Menu />
        <Grid fluid>
          <Row top="xs">
            <Col xs={6}>hehe</Col>
            <Col xs={6}>hehe</Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;