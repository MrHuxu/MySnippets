import {
  DELETE_SNIPPET,
  deleteSnippet,
  REFRESH_SNIPPET,
  refreshSnippet,
  SELECT_SNIPPET,
  selectSnippet
} from '../actions/SnippetActions';

var expect = require('chai').expect;

describe('Test snippet related actions', () => {
  it('delete snippet', () => {
    expect(deleteSnippet('a1b2')).to.be.deep.equal({
      type    : DELETE_SNIPPET,
      content : 'a1b2'
    });
  });

  it('refresh snippets', () => {
    expect(refreshSnippet(['a1', 'b2'])).to.be.deep.equal({
      type    : REFRESH_SNIPPET,
      content : ['a1', 'b2']
    });
  });

  it('select snippet', () => {
    expect(selectSnippet('a1b2')).to.be.deep.equal({
      type    : SELECT_SNIPPET,
      content : 'a1b2'
    });
  });
});