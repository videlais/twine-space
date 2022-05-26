const path = require('path');

module.exports = {
  entry: {
    format: './src/index.js',
    arjs: './src/aframe-index.js'
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: "[name].bundle.js"
  }
}