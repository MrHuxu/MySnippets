import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';

const style = {
  margin: 12,
};

class Menu extends Component {
  render () {
    return (
      <AppBar
        title = 'My Snippets'
        showMenuIconButton = {false}
      >
        <RaisedButton label="+" primary={true} style={style} />
      </AppBar>
    );
  }
}

export default Menu;