const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');

const clean = require('clean-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = merge(baseConfig, {
  // entry: {
  //   // common: ['react', 'react-dom']
  // },
  output: {
    path: resolve('dist'),
    filename: '[name]-[chunkhash].min.js'
  },
  plugins: [
    new clean(['../dist']),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common-[chunkhash].min.js',
      chunks: ['browser', 'mobile']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'manifest-[chunkhash].min.js',
      chunks: ['common']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      favicon: 'favicon.ico',
      chunks: ['app'],
      chunksSortMode: function (chunk1, chunk2) {
        return chunk1.id - chunk2.id;
      },
      minify: {
        collapseWhitespace: true
      }
    }),
    new InlineManifestWebpackPlugin(),
    new ExtractTextPlugin('[name]-[contenthash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer(),
        ]
      }
    })
  ]
});