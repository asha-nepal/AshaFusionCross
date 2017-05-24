const path = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const baseConfig = require('./webpack.config.base');

const config = merge(baseConfig, {
  target: 'electron-renderer',
  output: {
    filename: 'app.js',
    path: path.resolve('./build'),
    publicPath: '/',
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'node_modules/pouchdb/dist/pouchdb.min.js' },
      { from: 'node_modules/pouchdb-authentication/dist/pouchdb.authentication.min.js' },
      { from: './src/electron' },
      { from: './assets/img/logo.png' },
    ]),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        'pouchdb.min.js',
        'pouchdb.authentication.min.js',
      ],
      append: false,
    }),
  ],
});

if (process.env.NODE_ENV === 'production') {
  config.devtool = false;
}

module.exports = config;
