/* @flow */

import React from 'react';
import Async from '../../components/Async';

export default () => <Async load={import('./index')} />;
