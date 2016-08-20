import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.react';

if (process.env.NODE_ENV !== 'production') {
  window.Perf = require('react-addons-perf'); // eslint-disable-line global-require
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
