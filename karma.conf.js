'use strict';

const argv = require('yargs').argv;
const webpackConfig = require('./webpack.config');

module.exports = (config) => {
  config.set({
    browsers: [
      'Chrome'
    ],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'karma.tests.js'
    ],
    frameworks: [
      'jasmine-ajax',
      'jasmine'
    ],
    plugins: [
      'karma-chrome-launcher',
      'karma-eslint',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-jasmine-ajax',
      'karma-jsdom-launcher',
      'karma-safari-launcher',
      'karma-spec-reporter',
      'karma-sourcemap-loader',
      'karma-webpack'
    ],
    preprocessors: {
      'karma.tests.js': [
        'webpack',
        'sourcemap'
      ]
    },
    reporters: [
      'dots'
    ],
    singleRun: !argv.watch || true,
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  });
};
