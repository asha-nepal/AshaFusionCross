const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
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
    ],
  },
  resolve: {
    alias: {
      lib: path.resolve(__dirname, './lib'),
    },
  },
  plugins: [
    new ExtractTextPlugin('style.css', {
      allChunks: true,
    }),
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
