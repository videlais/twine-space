const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: {
    core: './src/index.js',
    aframe: './src/aframe-index.js',
    arjs: './src/arjs-index.js'
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: "[name].bundle.js"
  },
  resolve: {
    fallback: {
      "path": false,
      "fs": false
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ]
  },
  plugins: [new MiniCssExtractPlugin()]
}