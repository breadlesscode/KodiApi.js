var path = require('path'),
  webpack = require('webpack');

module.exports = {
  entry: {
    "KodiApi": "./src/KodiApi.js"
  },
  devtool: "source-map",
  output: {
    path: "./dist",
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
