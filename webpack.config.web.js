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
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const baseConfig = require('./webpack.config.base');

const isProd = process.env.NODE_ENV === 'production';

module.exports = merge(baseConfig, {
  output: {
    filename: isProd ? 'app-[hash].js' : 'app.js',
    path: path.resolve('./public'),
    publicPath: '/',
  },
  resolve: {
    mainFiles: ['browser', 'index'],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/web/.htaccess' },
      { from: './src/web/assets', to: 'assets' },
    ]),
  ],
  devServer: {
    contentBase: './public',
    port: 8080,
    inline: true,
    historyApiFallback: true,
  },
});

if (isProd) {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new FaviconsWebpackPlugin({
      logo: path.resolve('./assets/img/logo.svg'),
      title: 'ASHA fusion',
    }),
  ]);
}
