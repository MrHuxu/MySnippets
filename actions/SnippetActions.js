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

export const REFRESH_SNIPPET = 'REFRESH_SNIPPET';
export function refreshSnippet (id, update) {
  return {
    type    : REFRESH_SNIPPET,
    content : {
      id     : id,
      update : update
    }
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

export function updateSnippet (query, update) {
  return function (dispatch) {
    db.update(query, update, { multi: true }, function (err, numReplaced) {
      dispatch(refreshSnippet(query._id, update));
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