import {
  DELETE_SNIPPET,
  REFRESH_SNIPPET,
  SELECT_SNIPPET
} from '../actions/SnippetActions';

export function snippet (state = {
  ids        : [],
  entities   : {},
  selectedId : null,
  snack      : {
    open    : false,
    message : ''
  }
}, action) {
  var copy = Object.assign({}, state);

  switch (action.type) {
    case DELETE_SNIPPET:
      let message = action.content;
      return Object.assign(copy, {
        snack: {
          open: true,
          message: message
        }
      });

    case REFRESH_SNIPPET:
      return Object.assign(copy, action.content);

    case SELECT_SNIPPET:
      copy.selectedId = action.content;
      return copy;

    default:
      return copy;
  }
}