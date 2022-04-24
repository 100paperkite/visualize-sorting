const path = require('path');
const { merge } = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const productionConfig = {
  mode: 'production',

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
  },

  // css
  module: {
    rules: [
      {
        test: /\.css/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
  ],
};

// webpack-merge
module.exports = merge(require('./webpack.config.common'), productionConfig);
