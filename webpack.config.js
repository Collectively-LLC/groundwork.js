'use strict';

const exec = require('child_process').execSync;
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const DEVELOPMENT = NODE_ENV === 'development';
const PRODUCTION = NODE_ENV === 'production';

const releaseTag = process.env.PACKAGE_VERSION;
const tag = releaseTag || exec('git describe --always --tag | tr -d "[[:space:]]"');

let filename = 'groundwork.js';
const banner = `${filename} ${tag} | (c) ${new Date().getUTCFullYear()} Timshel / The Groundwork - BSD Licence https://opensource.org/licenses/BSD-3-Clause`;

let defineObj = {
  'process.env': {
    NODE_ENV
  },
  __LOG__: false,
  TAG: JSON.stringify(tag.toString())
};

const plugins = [
  new webpack.BannerPlugin(banner),
  new webpack.DefinePlugin(defineObj)
];

if (DEVELOPMENT) {
  defineObj.__LOG__ = true;

  plugins.push(
    new HtmlWebpackPlugin({
      title: 'The Groundwork Client',
      template: './examples/index.ejs',
      filename: 'index.html',
      inject: false
    }),
    new HtmlWebpackPlugin({
      title: 'The Groundwork | Examples',
      template: './examples/simple/index.ejs',
      filename: 'examples/index.html',
      inject: false
    }),
    new HtmlWebpackPlugin({
      title: 'Simple Auth (Login)',
      template: './examples/simple/auth.ejs',
      filename: 'examples/auth.html',
      inject: false
    }),
    new HtmlWebpackPlugin({
      title: 'Simple Supporter (Signup)',
      template: './examples/simple/supporter.ejs',
      filename: 'examples/supporter.html',
      inject: false
    })
  );
}

if (PRODUCTION) {
  defineObj = Object.assign({}, defineObj, {
    __LOG__: false,
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  });

  plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );

  filename = filename.replace('.js', '.min.js');
}

const babelQuery = {
  presets: [
    'es2015',
    'stage-0'
  ],
  plugins: [
    'lodash',
    'transform-runtime'
  ]
};

module.exports = {
  devtool: 'source-map',
  entry: {
    app: ['./src/lib/index.js']
  },
  output: {
    filename,
    libraryTarget: 'umd',
    library: 'Groundwork',
    path: path.join(__dirname, 'dist'),
    publicPath: ''
  },
  plugins,
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: [
      'node_modules'
    ],
    root: [
      path.resolve('./src')
    ]
  },
  module: {
    loaders: [
      /node_modules\/credit-card/,
      /node_modules\/reach/
    ].map(test => ({
      test,
      include: __dirname,
      loader: 'babel',
      query: babelQuery
    })).concat([
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'src')
        ],
        loader: 'babel',
        query: babelQuery
      }
    ])
  }
};
