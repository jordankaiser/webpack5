const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const sass = require('sass');

// Check Environment.
let isProduction = false;
if (typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'production') {
  isProduction = true;
}

const jsRules = {
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }
}

const scssRules = {
  test: /\.(sa|sc|c)ss$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
      },
    },
    {
      loader: 'resolve-url-loader',
      options: {
        sourceMap: true,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        implementation: sass,
        sourceMap: true,
        sassOptions: {
          outputStyle: isProduction ? 'compressed' : 'expanded',
        },
      },
    },
  ],
}

module.exports = {
  entry: {
    'main.bundle': './_ui/skin/src/js/main.js',
    'style.bundle': './_ui/skin/src/scss/style.scss',
  },
  output: {
    path: path.resolve('_ui/skin/dist'),
    filename: 'js/[name].js',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      jsRules,
      scssRules,
    ],
  },
  watch: !isProduction,
  devtool: isProduction ? false : 'source-map',
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
};