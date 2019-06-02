const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "xterm-addon-attach-socketio.ts"),
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, ".."), "node_modules"],
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "attach.js",
    path: path.resolve(__dirname, "dist")
  },
  mode: "development",
  watch: true
};