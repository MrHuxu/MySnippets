const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

config.output.publicPath = '/assets/';

const port = 15106;
new WebpackDevServer(webpack(config), {
  publicPath         : config.output.publicPath,
  hot                : true,
  historyApiFallback : true
}).listen(port, 'localhost', function (err, result) {
  if (err) console.log(err);

  console.log('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
