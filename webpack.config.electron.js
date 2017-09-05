/**
 * Copyright 2017 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
  resolve: {
    mainFiles: ['electron', 'index'],
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
