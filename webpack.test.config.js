const path = require('path');
const fs = require('fs');

module.exports = {
  mode: 'development',
  entry: {
    aframe: './src/aframe-index-sync.js',
    arjs: './src/arjs-index-sync.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].test.bundle.js',
    publicPath: './',
    clean: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  optimization: {
    // Disable code splitting for tests
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
        // Put everything in one bundle for tests
        test: {
          name: 'test-bundle',
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
};
