import React, { Component } from 'react';
import { connect } from 'react-redux';
import SnippetItem from './SnippetItem';
import { selectSnippet, fetchSnippets } from '../actions/SnippetActions';

class SnippetList extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      showDetail: false
    };

    this.handleUpdateSelectedIndex = this.handleUpdateSelectedIndex.bind(this);
    this.collapseCard = this.collapseCard.bind(this);
    this.expandCard = this.expandCard.bind(this);
  }

  collapseCard () {
    this.setState({ showDetail: false });
  }

  expandCard () {
    this.setState({ showDetail: true });
  }

  handleUpdateSelectedIndex (e, index) {
    const { dispatch, ids } = this.props;

    dispatch(selectSnippet(ids[index]));
  }

  componentDidMount () {
    this.props.dispatch(fetchSnippets({}, { updateSelectedId: true }));
  }

  render () {
    const { records } = this.props;
    const items = records.map((record, index) => <SnippetItem metaData={record} expand={this.state.showDetail} />);

    return (
      <div>
        <a
          className = "waves-effect waves-teal btn-flat"
          onClick   = {this.collapseCard}
        >
          <i className='material-icons'>list</i>
        </a>

        <a
          className = "waves-effect waves-teal btn-flat"
          onClick   = {this.expandCard}
        >
          <i className='material-icons'>view_list</i>
        </a>

        <div>
          {items}
        </div>
      </div>
    );
  }
}

var mapStateToProps = function (state) {
  return {
    ids           : state.snippet.ids,
    selectedIndex : state.snippet.ids.indexOf(state.snippet.selectedId),
    records       : state.snippet.ids.map(id => state.snippet.entities[id])
  };
};

export default connect(mapStateToProps)(SnippetList);