import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from 'material-ui/lib/lists/list';
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

class SnippetList extends List {
  constructor (props, context) {
    super(props, context);

    this.handleUpdateSelectedIndex = this.handleUpdateSelectedIndex.bind(this);
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
    const items = records.map((record, index) => <ListItem value={index} key={record._id}><SnippetItem metaData={record} /></ListItem>);

    return (
      <div>
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