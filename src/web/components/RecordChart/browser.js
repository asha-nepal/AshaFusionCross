/* @flow */

import React from 'react';
import Async from '../Async';

export default (props) => <Async load={import('./index')} {...props} />;
