const path = require("path");

export default {
  entry: {
    lists: path.join(__dirname, "resources/js/list/lists.js"),
    list_delete: path.join(__dirname, "resources/js/list/list-delete.js"),
    list_update: path.join(__dirname, "resources/js/list/list_update.js"),
    animations: path.join(__dirname, 'resources/js/animations.js'),
  },
  output: {
    path: path.join(__dirname, "public/js"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: "source-map"
};
