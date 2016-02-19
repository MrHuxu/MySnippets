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
    this.expantCard = this.expantCard.bind(this);
    this.collapseCard = this.collapseCard.bind(this);
  }

  expantCard () {
    this.setState({ showDetail: true });
  }

  collapseCard () {
    this.setState({ showDetail: false });
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
        <a className="waves-effect waves-teal btn-flat"><i className='material-icons'>list</i></a>
        <a className="waves-effect waves-teal btn-flat"><i className='material-icons'>view_list</i></a>
        <div className='collection'>
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