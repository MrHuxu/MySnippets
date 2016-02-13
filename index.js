import './node_modules/animate.css/animate.min.css';
import './node_modules/codemirror/lib/codemirror.css';
import './node_modules/codemirror/theme/solarized.css';

import './stylesheets/common.css';

import $ from 'jquery';
window.jQuery = $; // Assure it's available globally.
require('./node_modules/codemirror/mode/javascript/javascript');
require('./node_modules/codemirror/mode/ruby/ruby');
require('./node_modules/codemirror/mode/css/css');
require('./node_modules/codemirror/mode/xml/xml');
require('./node_modules/codemirror/mode/sql/sql');
require('./node_modules/codemirror/mode/markdown/markdown');
require('./node_modules/codemirror/mode/shell/shell');
require('./node_modules/codemirror/mode/haml/haml');

import React, { Component } from 'react';
import reactDom from 'react-dom';
import { Provider } from 'react-redux';
import { rootStore } from './store';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import App from './components/App.jsx';

reactDom.render(
  <Provider store={rootStore}>
    <App />
  </Provider>,
  document.getElementById('my-snippets')
);