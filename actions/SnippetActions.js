import db from '../database/nedb.config';

export const DELETE_SNIPPET = 'DELETE_SNIPPET';
export function deleteSnippet (title) {
  return {
    type    : DELETE_SNIPPET,
    content : title
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

export function fetchSnippets (query, option) {
  return (dispatch) => {
    db.find(query).sort({ time: -1 }).exec((err, docs) => {
      var fetchResult = {
        ids        : [],
        entities   : {}
      };

      docs.forEach((doc) => {
        fetchResult.ids.push(doc._id);
        fetchResult.entities[doc._id] = doc;
      });

      if (option.updateSelectedId) fetchResult.selectedId = fetchResult.ids[0];

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

  return (dispatch) => {
    db.insert(doc, (err, doc) => {
      dispatch(fetchSnippets({}, { updateSelectedId: true }));
    });
  };
}

export function updateSnippet (query, update) {
  return (dispatch) => {
    db.update(query, update, { multi: true }, (err, numReplaced) => {
      dispatch(fetchSnippets({}, { updateSelectedId: false }));
    });
  };
}

export function destroySnippet (query) {
  return (dispatch) => {
    db.remove(query, {}, (err, numRemoved) => {
      console.log(query);
      dispatch(fetchSnippets({}, { updateSelectedId: true }));
      dispatch(deleteSnippet(query.title));
    });
  };
}

export function importSnippets(docs) {
  return (dispatch) => {
    db.remove({}, { multi: true }, (err, numRemoved) => {
      db.insert(docs, (err, numDocs) => {
        dispatch(fetchSnippets({}, { updateSelectedId: true }));
      });
    });
  };
}