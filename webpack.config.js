const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,                                   // input path
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client?path=http://localhost:15106/__webpack_hmr',
    './index' // Your appʼs entry point
  ],
  output: {
    path: path.join(__dirname, 'vendor', 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.jsx', '.scss', '.js', '.json'],  // along the way, subsequent file(s) to be consumed by webpack
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react']
        }
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /(\.scss|\.sass)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap')
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader'
      }
    ]
  },
  postcss: [autoprefixer],
  plugins: [
    new ExtractTextPlugin('bundle.css', { allChunks: true }),  // compiled css (single file only)
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
