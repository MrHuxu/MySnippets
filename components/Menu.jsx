import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';


const style = {
  margin: 12,
};

class Menu extends Component {
  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    alert('hehe');
  }

  render () {
    return (
      <AppBar
        title = 'My Snippets'
        iconElementLeft={<IconButton><ContentAdd /></IconButton>}
      >
      </AppBar>
    );
  }
}

export default Menu;