import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootswatch/paper/bootstrap.min.css';
import './index.css';

import 'groundwork.js/lib/modules/common';
import Groundwork from 'groundwork.js';
import groundworkFactory from 'groundwork.js/lib/modules/groundworkFactory';
import Event from 'groundwork.js/lib/modules/Event';

// Example full build
// const gw = Groundwork(options);
// console.warn('\n', 'Full build: \n', gw);

const buildGroundwork = groundworkFactory([
  Event
]);

const modularGw = buildGroundwork({
  apiUrl: 'https://api.dev.thegroundwork.com',
  apiKey: 'pub-lantern.www-main--0vU497cBQeMEqORWa4HMe7WnlfcwtuWj9JTT4AGsEllp0f_21wg6SORuClIXIJorFfPZkKj0OorrT3h6_jB9xg'
});

console.warn('\n', 'Modular build: \n', modularGw);

ReactDOM.render(
  <App gw={modularGw} />,
  document.getElementById('root')
);
