'use strict';
const path = require('path');

const merge = require('webpack-merge');
const common = require('./webpack.conf.js');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  plugins: [
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'CNAME'),
        to: path.resolve(__dirname, 'dist'),
      },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
});
