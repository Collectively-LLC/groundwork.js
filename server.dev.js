const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const PORT = 3000;
const ENV = process.env.NODE_ENV;
const DEVELOPMENT = ENV === 'development';
const hot = DEVELOPMENT || false;

new WebpackDevServer(webpack(config), {
  contentBase: config.output.path,
  outputPath: config.output.path,
  publicPath: config.output.publicPath,
  hot,
  historyApiFallback: true,
  stats: {
    assets: false,
    children: false,
    chunks: false,
    colors: true,
    errorDetails: true,
    errors: true,
    hash: false,
    modules: false,
    publicPath: false,
    reasons: false,
    source: false,
    timings: true,
    version: false,
    warnings: true
  }
}).listen(PORT, (err) => {
  /* eslint-disable no-console*/

  if (err) {
    console.log(err);
  }

  console.log(`\n @@@ (server.dev.js) Open http://localhost:${PORT} to view Groundwork.js\n`);
});
