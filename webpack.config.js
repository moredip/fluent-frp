var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: "./dist",
    libraryTarget: "var",
    library: "Marbelous"
  },
  module: {
    loaders: [
      { 
        test: /.js$/, 
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader' 
      }
    ]
  },
  plugins: []
};
