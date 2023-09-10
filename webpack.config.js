const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src/scripts", "script.js"),
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    watchFiles: path.join(__dirname, "src"),
    hot: true,
    port: 3010,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
        generator: {
          filename: path.join("static/script", "[name].[ext]"),
        },
      },
      {
        test: /\.pug$/,
        loader: "pug-loader",
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
        generator: {
          filename: path.join("static/css", "[name].[ext]"),
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: path.join("static/img", "[name].[ext]"),
        },
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: path.join("static/icons", "[name].[contenthash][ext]"),
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "template.pug"),
      filename: "index.html",
    }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ["dist"],
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],

  optimization: {
    minimizer: [new TerserWebpackPlugin({}), new OptimizeCssAssetsPlugin({})],
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
};
