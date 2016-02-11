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
export function refreshSnippet (fetchResult) {
  return {
    type    : REFRESH_SNIPPET,
    content : fetchResult
  };
}

export const SELECT_SNIPPET = 'SELECT_SNIPPET';
export function selectSnippet (id) {
  return {
    type    : SELECT_SNIPPET,
    content : id
  };
}

export function fetchSnippets (query) {
  return function (dispatch) {
    db.find(query).sort({ time: -1 }).exec((err, docs) => {
      var fetchResult = {
        ids        : [],
        entities   : {},
        selectedId : null
      };

      docs.forEach((doc) => {
        fetchResult.ids.push(doc._id);
        fetchResult.entities[doc._id] = doc;
      });

      fetchResult.selectedId = fetchResult.ids[0];

      dispatch(refreshSnippet(fetchResult));
    });
  }
}

export function createSnippet () {
  var doc = {
    title   : 'Untitled',
    time    : new Date(),
    content : "",
    lang    : 'javascript'
  };

  return function (dispatch) {
    db.insert(doc, (err, doc) => {
      dispatch(fetchSnippets({}));
    });
  };
}

export function updateSnippet (query, update) {
  return function (dispatch) {
    db.update(query, update, { multi: true }, function (err, numReplaced) {
      dispatch(fetchSnippets({}));
    });
  };
}

export function destroySnippet (id) {
  return function (dispatch) {
    db.remove({ _id: id }, {}, function (err, numRemoved) {
      //dispatch(deleteSnippet(id));
      dispatch(fetchSnippets({}));
    });
  };
}