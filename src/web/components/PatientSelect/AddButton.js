/* @flow */
import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <Link to={'/patient/'} className="button is-primary is-medium">
    <span className="icon">
      <i className="fa fa-plus" />
    </span>
    <span>New patient</span>
  </Link>
);
