/* @flow */
import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <Link to={'/patient/'} className="button is-primary is-outlined is-fullwidth">
    New
  </Link>
);
