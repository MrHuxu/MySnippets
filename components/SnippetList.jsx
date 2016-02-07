import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/lib/svg-icons/content/drafts';
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import Divider from 'material-ui/lib/divider';
import SnippetItem from './SnippetItem';

class SnippetList extends List {
  render () {
    const { records } = this.props;
    const items = records.map(record => <ListItem key={record._id}><SnippetItem metaData={record} /></ListItem>);

    return (
      <div>
        <List>
          {items}
        </List>
      </div>
    );
  }
}

var mapStateToProps = function (state) {
  return {
    records: state.snippet.records
  };
};

export default connect(mapStateToProps)(SnippetList);