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
import { selectSnippet } from '../actions/SnippetActions';

class SnippetList extends List {
  constructor (props, context) {
    super(props, context);
    this.state = {
      selectedIndex: 0
    };

    const { dispatch, records } = this.props;
    if (records.length) dispatch(selectSnippet(records[0]._id));

    this.handleUpdateSelectedIndex = this.handleUpdateSelectedIndex.bind(this);
  }

  handleUpdateSelectedIndex (e, index) {
    const { dispatch, records } = this.props;

    this.setState({
      selectedIndex: index,
    });
    dispatch(selectSnippet(records[index]._id));
  }

  render () {
    const { records } = this.props;
    const items = records.map((record, index) => <ListItem value={index} key={record._id}><SnippetItem metaData={record} /></ListItem>);

    return (
      <div>
        <SelectableList
          valueLink={{
            value: this.state.selectedIndex,
            requestChange: this.handleUpdateSelectedIndex
          }}
        >
          {items}
        </SelectableList>
      </div>
    );
  }
}

SnippetList.contextTypes = {
  muiTheme: React.PropTypes.object
};

var mapStateToProps = function (state) {
  return {
    records: state.snippet.ids.map(id => state.snippet.entities[id])
  };
};

export default connect(mapStateToProps)(SnippetList);