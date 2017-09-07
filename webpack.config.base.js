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

const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: [
    'babel-polyfill',
    './src/web/app.js',
    './src/web/sass/style.sass',
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              'syntax-dynamic-import',
              'lodash',
              ['module-resolver', {
                alias: {
                  randomstring: 'randomstring-promise',
                },
              }],
            ],
          },
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(jpg|jpeg|png)$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'assets/img/[name]-[hash].[ext]',
        },
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
        },
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules',
    ],
    alias: {
      lib: path.resolve(__dirname, './lib'),
    },
  },
  plugins: [
    new ExtractTextPlugin({
      filename: isProd ? 'style-[hash].css' : 'style.css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: 'src/web/index.ejs',
      title: '',
    }),
    new HtmlWebpackPlugin({
      template: 'src/web/index.ejs',
      filename: 'print.html',
      title: 'Print',
      excludeAssets: [/app.js/],
    }),
    new HtmlWebpackExcludeAssetsPlugin(),
  ],
  devtool: '#eval-source-map',
};

if (isProd) {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new LodashModuleReplacementPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|ja|ne/),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
      openAnalyzer: process.env.OPEN_ANALYZER === 'true',
    }),
  ]);
}

// Additional options configured by environment variables
const envKeys = [
  'COUCH_HOST',
];

const envs = _.pick(process.env, envKeys);

if (Object.keys(envs).length > 0) {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': envs,
    }),
  ]);
}
