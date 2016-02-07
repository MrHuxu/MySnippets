import thunkMiddleware from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { snippet } from './reducers/SnippetReducer';

const rootReducer = combineReducers({
  snippet
});

export const rootStore = compose(
  applyMiddleware(thunkMiddleware),
)(createStore)(rootReducer);