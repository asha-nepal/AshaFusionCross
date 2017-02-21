const path = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  output: {
    filename: 'app.js',
    path: path.resolve('./public'),
    publicPath: '/',
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

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new FaviconsWebpackPlugin({
      logo: path.resolve('./assets/img/logo.svg'),
      title: 'ASHA fusion',
    }),
  ]);
}
