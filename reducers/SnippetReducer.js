import {
  ADD_SNIPPET,
  DELETE_SNIPPET
} from '../actions/SnippetActions';

export function snippet (state = {
  records: [{
    id      : (new Date()).toLocaleString(),
    title   : 'Untitled',
    time    : (new Date()).toLocaleString(),
    content : "import React, { Component } from 'react';\
                import Card from 'material-ui/lib/card/card';\
                import CardActions from 'material-ui/lib/card/card-actions';\
                import CardHeader from 'material-ui/lib/card/card-header';\
                import FlatButton from 'material-ui/lib/flat-button';\
                import CardText from 'material-ui/lib/card/card-text';\
              ",
    lang    : 'js'
  }]
}, action) {
  switch (action.type) {
    case ADD_SNIPPET:
      return Object.assign({}, state, { records: [{
        id      : (new Date()).toLocaleString(),
        title   : 'Untitled',
        time    : (new Date()).toLocaleString(),
        content : "import React, { Component } from 'react';\
                   import Card from 'material-ui/lib/card/card';\
                   import CardActions from 'material-ui/lib/card/card-actions';\
                   import CardHeader from 'material-ui/lib/card/card-header';\
                   import FlatButton from 'material-ui/lib/flat-button';\
                   import CardText from 'material-ui/lib/card/card-text';\
                  ",
        lang    : 'js'
      }, ...state.records] })

    default:
      return state;
  }
}