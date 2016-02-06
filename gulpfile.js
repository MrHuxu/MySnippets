var gulp             = require('gulp');
var shell            = require('gulp-shell');
var gutil            = require('gulp-util');
var webpack          = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var webpackConfig    = require('./webpack.config');

gulp.task("webpack", function(callback) {
  webpack(webpackConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
      gutil.log("[webpack]", stats.toString());
      callback();
  });
});

gulp.task("webpack-dev-server", function(callback) {
  webpackConfig.entry = [
    'webpack-dev-server/client?http://0.0.0.0:6789', // WebpackDevServer host and port
    'webpack/hot/dev-server', // "only" prevents reload on syntax errors
    './index' // Your appʼs entry point
  ];

  webpackConfig.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
  ];
  var compiler = webpack(webpackConfig);
  new webpackDevServer(compiler, {
    hot        : true,
    stats      : { colors : true },
    publicPath : '/assets/'
  }).listen(6789, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:6789/assets/bundle.js");
    callback();
  });
});

gulp.task('cache', shell.task('node lib/cache-all --harmony'));

gulp.task('prd', ['webpack', 'cache'], shell.task('NODE_ENV=production forever start bin/www --harmony'));

gulp.task('dev', ['webpack-dev-server'], shell.task('node server --harmony'));

gulp.task('dev-ele', ['webpack-dev-server'], shell.task('/Applications/Electron.app/Contents/MacOS/Electron .'));
