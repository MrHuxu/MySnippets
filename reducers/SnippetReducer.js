import {
  ADD_SNIPPET,
  DELETE_SNIPPET
} from '../actions/SnippetActions';

export function snippet (state = {
  records: {},
  snack: {
    open: false,
    message: ''
  }
}, action) {
  var copy = Object.assign({}, state);

  switch (action.type) {
    case ADD_SNIPPET:
      copy.records[action.content._id] = action.content;
      return copy;

    case DELETE_SNIPPET:
      let message = copy.records[action.content].title;
      delete copy.records[action.content];
      return Object.assign(copy, {
        snack: {
          open: true,
          message: message
        }
      });

    default:
      return copy;
  }
}