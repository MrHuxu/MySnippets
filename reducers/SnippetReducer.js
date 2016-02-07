import {
  ADD_SNIPPET,
  DELETE_SNIPPET
} from '../actions/SnippetActions';

export function snippet (state = {
  records: []
}, action) {
  switch (action.type) {
    case ADD_SNIPPET:
      return Object.assign({}, state, { records: [action.content, ...state.records] });

    case DELETE_SNIPPET:
      return Object.assign({}, state, { records: state.records.filter(record => record._id !== action.content) });

    default:
      return state;
  }
}