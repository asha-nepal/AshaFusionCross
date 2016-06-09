var path = require('path')

module.exports = {
  entry: [
    './src/web/app.js',
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
          ]
        },
      },
    ],
  },
  devServer: {
    contentBase: './public',
    port: 8080,
    inline: true,
  },
}
