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
      copy.ids = copy.ids.filter(id => id !== action.content)
      let message = copy.entities[action.content].title;
      delete copy.entities[action.content];
      if (copy.ids.length) {
        copy.selectedId = copy.ids[0];
      } else {
        copy.selectedId = null;
      }
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