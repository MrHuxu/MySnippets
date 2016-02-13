const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config');

config.output.publicPath = 'http://localhost:15106/assets/';

const app = express();
const compiler = webpack(config);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'vendor', 'dist')));

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: 'http://localhost:15106/assets/',
  stats: {
    colors: true
  }
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.render(path.join(__dirname, 'index.ejs'));
});

const port = 15106;
app.listen(port, () => console.log('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port));