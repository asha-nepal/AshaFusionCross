/* @flow */

import {
  browserHistory,
  hashHistory,
} from 'react-router';

// Electron or Web?
export default (window && window.process && window.process.type) ? hashHistory : browserHistory;
