import './node_modules/animate.css/animate.min.css';
import './node_modules/highlight.js/styles/solarized-dark.css';

import './stylesheets/common.css';

import $ from 'jquery';
window.jQuery = $; // Assure it's available globally.

import React, { Component } from 'react';
import reactDom from 'react-dom';
import { Provider } from 'react-redux';
// import { rootStore } from './store';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import App from './components/App.jsx';

reactDom.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('my-snippets')
);