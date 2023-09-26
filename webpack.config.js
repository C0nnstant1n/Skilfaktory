const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src/scripts", "script.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "main.js",
    assetModuleFilename: 'assets/[hash][ext][query]', // Все ассеты будут
    // складываться в dist/assets
  },
  devtool: "source-map",
  devServer: {
    static: "./dist",
    watchFiles: path.join(__dirname, "src"),
  },

  module: {
    rules: [
      { 
        test: /\.(html)$/,
         use: ['html-loader'] }, // Добавляем загрузчик для html
      {
        test: /\.(ts|js)x?$/i,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: path.join("static/icons", "[name].[contenthash].[ext]"),
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "template.html"),
      filename: "index.html",
    }),
  ]
};
