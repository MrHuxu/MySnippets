const gulp              = require('gulp');
const shell             = require('gulp-shell');
const gutil             = require('gulp-util');
const webpack           = require('webpack');
const webpackDevServer  = require('webpack-dev-server');
const webpackConfig     = require('./webpack.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

gulp.task("webpack", function(callback) {
  webpack(webpackConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
      gutil.log("[webpack]", stats.toString());
      callback();
  });
});

gulp.task("webpack-dev-server", function(callback) {
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
