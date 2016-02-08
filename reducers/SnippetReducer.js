import {
  ADD_SNIPPET,
  DELETE_SNIPPET,
  SELECT_SNIPPET
} from '../actions/SnippetActions';

export function snippet (state = {
  ids        : [],
  entities   : {},
  selectedId : '',
  snack      : {
    open    : false,
    message : ''
  }
}, action) {
  var copy = Object.assign({}, state);

  switch (action.type) {
    case ADD_SNIPPET:
      copy.ids.unshift(action.content._id);
      copy.entities[action.content._id] = action.content;
      return copy;

    case DELETE_SNIPPET:
      copy.ids = copy.ids.filter(id => id !== action.content)
      let message = copy.entities[action.content].title;
      delete copy.entities[action.content];
      return Object.assign(copy, {
        snack: {
          open: true,
          message: message
        }
      });

    case SELECT_SNIPPET:
      copy.selectedId = action.content;
      return copy;

    default:
      return copy;
  }
}