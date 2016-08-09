const Promise = require('babel-runtime/core-js/promise').default;

// Stub for Firefox
window.Promise = Promise;

const context = require.context('./src', true, /\.test\.js$/);
context.keys().forEach(context);
