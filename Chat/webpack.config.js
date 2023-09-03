const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./static/scripts/temp_scripts/script.js",
  devtool: "inline-source-map",
  devServer: {
    static: "./static",
    hot: true,
    port: 3000,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "templates", "default.html"),
      filename: "index.html",
    }),
  ],

  optimization: {
    minimizer: [new TerserWebpackPlugin({}), new OptimizeCssAssetsPlugin({})],
  },

  output: {
    path: path.resolve(__dirname, "static/scripts"),
    filename: "main.js",
  },
};
