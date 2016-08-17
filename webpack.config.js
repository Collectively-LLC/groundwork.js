'use strict';

const argv = require('yargs').argv;
const exec = require('child_process').execSync;
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const DEVELOPMENT = NODE_ENV === 'development';
const PRODUCTION = NODE_ENV === 'production';
const BUILD_MODULES = Boolean(argv.modules);

const releaseTag = process.env.PACKAGE_VERSION;
const tag = releaseTag || exec('git describe --always --tag | tr -d "[[:space:]]"');

let filename = 'groundwork.js';
const banner = `${filename} ${tag} | (c) ${new Date().getUTCFullYear()} Timshel / The Groundwork - BSD Licence https://opensource.org/licenses/BSD-3-Clause`;

const babelQuery = {
  presets: [
    'es2015',
    'stage-0'
  ],
  plugins: [
    'lodash',
    'transform-class-properties',
    'transform-runtime'
  ]
};

let defineObj = {
  'process.env': {
    NODE_ENV
  },
  __LOG__: false,
  TAG: JSON.stringify(tag.toString())
};

// Main entry point for GW.js
let entry = {
  index: ['./src/index.js']
};

// Output location for compiled files
let outputPath = path.join(__dirname, 'lib');

const plugins = [
  new webpack.BannerPlugin(banner),
  new webpack.DefinePlugin(defineObj)
];

if (DEVELOPMENT) {
  defineObj.__LOG__ = true;

  // Setup HTML pages -- overview, examples, and so on.
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

// Compile Groundwork services into modules that can be individually imported
if (BUILD_MODULES) {
  filename = '[name].js';
  outputPath = path.join(__dirname, 'lib/modules');

  plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      filename: 'common.js',
      name: 'common',
      minChunks: 3
    })
  );

  entry = Object.assign({}, entry, {
    Donation: ['./src/Donation.js'],
    Event: ['./src/Event.js'],
    Groundwork: ['./src/Groundwork.js'],
    Profile: ['./src/Profile.js'],
    Quickcard: ['./src/Quickcard.js'],
    Subscription: ['./src/Subscription.js'],
    Supporter: ['./src/Supporter.js'],
    groundworkFactory: ['./src/groundworkFactory.js'],

    // Drop libraries that are shared across modules here
    common: [
      'axios',
      'credit-card',
      'currency-formatter',
      'lodash',
      'numeral',
      'tv4'
    ]
  });
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

module.exports = {
  devtool: 'source-map',
  entry,
  output: {
    filename,
    libraryTarget: 'umd',
    library: 'Groundwork',
    path: outputPath,
    publicPath: '',
    sourceMapFilename: '[file].map'
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
      test: new RegExp(test),
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
