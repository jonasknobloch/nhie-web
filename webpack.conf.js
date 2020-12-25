const path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const env = process.env.NODE_ENV || 'development';

module.exports = {
  mode: env,
  plugins: [
    new CleanWebpackPlugin(),
    new ESLintPlugin(),
    new StylelintPlugin({
      files: './src/**/*.scss',
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.hbs',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'src/assets'),
          to: path.join(__dirname, 'dist/assets'),
        },
        {
          from: path.join(__dirname, 'CNAME'),
          to: path.join(__dirname, 'dist'),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer'),
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  devtool: env === 'development' && 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 1337,
    writeToDisk: true,
  },
};
