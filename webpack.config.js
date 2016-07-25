const path = require('path');
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
};
