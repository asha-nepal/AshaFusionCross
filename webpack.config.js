const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/web/app.js',
    './src/web/sass/style.sass',
  ],
  output: {
    filename: 'app.js',
    path: path.resolve('./public'),
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: [
            'transform-runtime',
          ],
        },
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.html$/,
        loader: 'html',
      },
      {
        test: /\.(jpg|jpeg)$/,
        loader: 'url-loader?mimetype=image/jpeg&limit=1024&name=assets/img/[name].[ext]',
      },
      {
        test: /\.png$/,
        loader: 'url-loader?mimetype=image/png&limit=1024&name=assets/img/[name].[ext]',
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
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
    alias: {
      lib: path.resolve(__dirname, './lib'),
    },
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/web/.htaccess' },
      { from: './src/web/assets', to: 'assets' },
    ]),
    new ExtractTextPlugin('style.css', {
      allChunks: true,
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve('./assets/img/logo.svg'),
      title: 'ASHA fusion',
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
  devServer: {
    contentBase: './public',
    port: 8080,
    inline: true,
    historyApiFallback: true,
  },
  devtool: '#eval-source-map',
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]);
}
