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
