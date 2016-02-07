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
  }
}

export function createSnippet () {
  var doc = {
    title   : 'Untitled',
    time    : (new Date()).toLocaleString(),
    content : "import React, { Component } from 'react';\
               import Card from 'material-ui/lib/card/card';\
               import CardActions from 'material-ui/lib/card/card-actions';\
               import CardHeader from 'material-ui/lib/card/card-header';\
               import FlatButton from 'material-ui/lib/flat-button';\
               import CardText from 'material-ui/lib/card/card-text';\
              ",
    lang    : 'js'
  };

  return function (dispatch) {
    db.insert(doc, (err, doc) => {
      dispatch(addSnippet(doc));
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