const gulp              = require('gulp');
const shell             = require('gulp-shell');
const gutil             = require('gulp-util');
const webpack           = require('webpack');
const webpackConfig     = require('./webpack.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

gulp.task("webpack", function(callback) {
  webpack(webpackConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
      gutil.log("[webpack]", stats.toString());
      callback();
  });
});

gulp.task('dev', shell.task('NODE_ENV=development node server --harmony'));

gulp.task('prd', ['webpack'], shell.task('NODE_ENV=production forever start server.js --harmony'));

gulp.task('prd-ele', ['webpack'], shell.task('NODE_ENV=production /Applications/Electron.app/Contents/MacOS/Electron .'));
