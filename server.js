const path = require('path');
const express = require('express');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const app = express();
const compiler = webpack(config);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'vendor', 'dist')));

app.get('*', (req, res) => {
  res.render(path.join(__dirname, 'index.ejs'));
});

const port = 15106;
app.listen(port, () => console.log('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port));

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(port, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:%s', port);
});