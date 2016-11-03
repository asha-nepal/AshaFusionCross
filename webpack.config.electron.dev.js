const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
const path = require('path');
const config = require('./webpack.config');

config.output = {
  filename: 'app.js',
  path: path.resolve('./build'),
  publicPath: '/',
};
config.debug = true;

config.target = webpackTargetElectronRenderer(config);

module.exports = config;
