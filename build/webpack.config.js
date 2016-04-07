var path = require('path'),
  webpack = require('webpack'),
  minimize = process.argv.indexOf('--minimize') !== -1,
  plugins = [];

if (minimize) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
   minimize: true
  }));
}

module.exports = {
  entry: {
    "KodiApi": "./src/KodiApi.js"
  },
  devtool: "source-map",
  output: {
    path: "./dist",
    filename: "[name].js"
  },
  plugins: plugins,
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
};
