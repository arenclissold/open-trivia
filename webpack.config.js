const path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname),
    filename: "main.js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // {
      //   test: /\.css$/i,
      //   use: ["style-loader", "css-loader"]
      // },
      // {
      //   test:    /\.html$/,
      //   exclude: /node_modules/,
      //   loader:  'file-loader?name=[name].[ext]',
      // }
    ]
  },
  // resolve: {
  //   extensions: ['.css', '.js']
  // },
};
