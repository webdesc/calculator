'use strict';

module.exports = {
  entry: './frontend/modules/calc/js/app',
  output: {
    path: './',
    filename: 'build.js'
  },
  watch: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }/*,
      {
        test: /\.jade$/,
        loader: 'jade'
      }*/
    ]
  }
}