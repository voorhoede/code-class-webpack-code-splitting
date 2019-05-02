const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const initialData = require('./modules/i18n/nl');

module.exports = {
  mode: 'none',
  entry: './index.js',
  output: {
    filename: './index.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
        ...initialData,
      template: 'index.ejs'
    }),
  ],
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   }
  // }
};
