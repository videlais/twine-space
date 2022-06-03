const path = require('path');

module.exports = {
  entry: {
    core: './src/core-build/core-index.js',
    aframe: './src/aframe-build/aframe-index.js',
    arjs: './src/arjs-build/arjs-index.js'
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
}