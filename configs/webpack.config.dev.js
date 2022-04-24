const path = require('path');
const { merge } = require('webpack-merge');

const developmentConfig = {
  mode: 'development',

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    clean: true,
  },

  // css
  module: {
    rules: [
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  // webpack-dev-server
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 9000,
    static: {
      directory: path.resolve(__dirname, '../dist'),
    },
    historyApiFallback: {
      rewrites: [{ from: /.*/g, to: '/index.html' }],
    },
  },

  devtool: 'eval-source-map',
};

// webpack-merge
module.exports = merge(require('./webpack.config.common'), developmentConfig);
