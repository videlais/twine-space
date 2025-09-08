const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

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
    clean: true,
    publicPath: './'
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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: ['last 2 versions', 'ie >= 11']
                },
                modules: false,
                useBuiltIns: 'usage',
                corejs: 3
              }]
            ],
            plugins: [
              // Add plugins for smaller builds
              ['@babel/plugin-proposal-class-properties'],
              ['@babel/plugin-syntax-dynamic-import']
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
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log', 'console.info', 'console.warn'],
            passes: 3, // More aggressive compression
            unsafe_arrows: true,
            unsafe_comps: true,
            unsafe_math: true,
            unsafe_methods: true,
            unsafe_proto: true,
            unsafe_regexp: true,
            unsafe_undefined: true
          },
          mangle: {
            safari10: true,
            properties: {
              regex: /^_/ // Mangle properties starting with underscore
            }
          },
          format: {
            comments: false
          }
        },
        extractComments: false,
        parallel: true
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      })
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 10000,
      maxSize: 500000, // Split chunks larger than 500KB
      cacheGroups: {
        jquery: {
          test: /[\\/]node_modules[\\/]jquery[\\/]/,
          name: 'jquery',
          chunks: 'all',
          priority: 30
        },
        aframe: {
          test: /[\\/]node_modules[\\/]aframe[\\/]/,
          name: 'aframe-vendor',
          chunks: 'async',
          priority: 25
        },
        arjs: {
          test: /[\\/]node_modules[\\/]@ar-js-org[\\/]/,
          name: 'arjs-vendor', 
          chunks: 'async',
          priority: 25
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 20
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true
        }
      }
    },
    usedExports: true,
    sideEffects: false,
    concatenateModules: true,
    runtimeChunk: 'single' // Extract webpack runtime to separate chunk
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    // Gzip compression for smaller file sizes
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8,
    })
  ],
  performance: {
    maxAssetSize: 300000, // 300KB
    maxEntrypointSize: 300000, // 300KB  
    hints: 'warning'
  }
};
