const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    core: './test/Story/index.js'
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: "[name].bundle.js"
  },
  resolve: {
    fallback: {
      "path": false,
      "fs": false
    }
  }
}
