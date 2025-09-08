const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'production',
  entry: {
    core: './src/index.js',
    aframe: './src/aframe-index.js',
    arjs: './src/arjs-index.js'
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: "[name].[contenthash].bundle.js",
    chunkFilename: '[name].[contenthash].chunk.js',
    publicPath: './', // Set static publicPath for browser compatibility
    clean: true // Clean the output directory before emit
  },
  resolve: {
    fallback: {
      "path": false,
      "fs": false
    },
    // Add alias for smaller jQuery build if needed
    alias: {
      'jquery': path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      // Add babel-loader for better compression (optional)
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: ['last 2 versions']
                },
                modules: false, // Let webpack handle modules for better tree shaking
                useBuiltIns: 'usage',
                corejs: 3
              }]
            ]
          }
        }
      }
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Remove console.log statements
            drop_debugger: true, // Remove debugger statements
            pure_funcs: ['console.log', 'console.info'], // Remove specific functions
            passes: 2, // Run compression twice for better results
            unsafe_arrows: true,
            unsafe_comps: true,
            unsafe_math: true
          },
          mangle: {
            safari10: true, // Fix Safari 10 bug
          },
          format: {
            comments: false // Remove all comments
          }
        },
        extractComments: false, // Don't extract comments to separate files
        parallel: true // Use multiprocessing for faster builds
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        // jQuery gets its own chunk since it's used across multiple entries
        jquery: {
          test: /[\\/]node_modules[\\/]jquery[\\/]/,
          name: 'jquery',
          chunks: 'all',
          priority: 20,
          enforce: true
        },
        // A-Frame gets its own chunk for dynamic loading
        aframe: {
          test: /[\\/]node_modules[\\/]aframe[\\/]/,
          name: 'aframe-vendor',
          chunks: 'async', // Only for dynamic imports
          priority: 15,
          enforce: true
        },
        // AR.js gets its own chunk for dynamic loading
        arjs: {
          test: /[\\/]node_modules[\\/]@ar-js-org[\\/]/,
          name: 'arjs-vendor',
          chunks: 'async', // Only for dynamic imports
          priority: 15,
          enforce: true
        },
        // Other vendor libraries
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
          enforce: true
        },
        // Common code shared between entries
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 5,
          enforce: true
        }
      }
    },
    // Enable tree shaking
    usedExports: true,
    sideEffects: false,
    // Optimize module concatenation
    concatenateModules: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    // Uncomment the next line to analyze bundle sizes
    // new BundleAnalyzerPlugin()
  ],
  performance: {
    maxAssetSize: 500000, // 500KB
    maxEntrypointSize: 500000, // 500KB
    hints: 'warning'
  }
}