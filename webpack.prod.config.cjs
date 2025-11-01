const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  devtool: false, // No source maps for production
  entry: {
    core: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: "[name].bundle.js",
    clean: true
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
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: false,
            pure_funcs: ['console.log'],
          },
          mangle: true,
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin()
    ],
    usedExports: true, // Tree shaking
    sideEffects: false,
  },
  performance: {
    maxEntrypointSize: 5120000, // 5MB
    maxAssetSize: 5120000,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../bundle-report.html',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: '../bundle-stats.json',
    })
  ]
}
