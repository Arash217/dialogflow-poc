const path = require("path");

export default {
  entry: {
    lists: path.join(__dirname, "resources/js/lists.js"),
    list_delete: path.join(__dirname, "resources/js/list-delete.js"),
    channels: path.join(__dirname, 'resources/js/channels.js'),
    channel_delete: path.join(__dirname, 'resources/js/channel-delete.js'),
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
