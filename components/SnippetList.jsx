import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from 'material-ui/lib/lists/list';
import FlatButton from 'material-ui/lib/flat-button';
import ListIcon from 'material-ui/lib/svg-icons/action/list';
import ViewListIcon from 'material-ui/lib/svg-icons/action/view-list';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
const SelectableList = SelectableContainerEnhance(List);
import ListItem from 'material-ui/lib/lists/list-item';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/lib/svg-icons/content/drafts';
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import Divider from 'material-ui/lib/divider';
import SnippetItem from './SnippetItem';
import { selectSnippet, fetchSnippets } from '../actions/SnippetActions';

const style = {
  snippetList: {
    margin  : '10px 0 0 0',
    padding : '0 0 70px 0'
  }
};

class SnippetList extends List {
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
    const items = records.map((record, index) => <ListItem value={index} key={record._id}><SnippetItem metaData={record} expand={this.state.showDetail} /></ListItem>);

    return (
      <div style={style.snippetList}>
        <div>
          <FlatButton icon={<ListIcon />} primary={true} onClick={this.collapseCard} />
          <FlatButton icon={<ViewListIcon />} secondary={true} onClick={this.expantCard} />
        </div>

        <SelectableList
          valueLink={{
            value         : this.props.selectedIndex,
            requestChange : this.handleUpdateSelectedIndex
          }}
        >
          {items}
        </SelectableList>
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