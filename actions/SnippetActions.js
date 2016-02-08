import db from '../database/nedb.config';

export const ADD_SNIPPET = 'ADD_SNIPPET';
export function addSnippet (doc) {
  return {
    type    : ADD_SNIPPET,
    content : doc
  };
}

export const DELETE_SNIPPET = 'DELETE_SNIPPET';
export function deleteSnippet (id) {
  return {
    type    : DELETE_SNIPPET,
    content : id
  };
}

export const SELECT_SNIPPET = 'SELECT_SNIPPET';
export function selectSnippet (id) {
  return {
    type    : SELECT_SNIPPET,
    content : id
  };
}

export function createSnippet () {
  var doc = {
    title   : 'Untitled',
    time    : (new Date()).toLocaleString(),
    content : "",
    lang    : 'javascript'
  };

  return function (dispatch) {
    db.insert(doc, (err, doc) => {
      dispatch(addSnippet(doc));
      dispatch(selectSnippet(doc._id));
    });
  };
}

export function destroySnippet (id) {
  return function (dispatch) {
    db.remove({ _id: id }, {}, function (err, numRemoved) {
      dispatch(deleteSnippet(id));
    });
  };
}