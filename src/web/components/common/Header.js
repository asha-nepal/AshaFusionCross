/* @flow */

import React from 'react';
import { Link } from 'react-router';

export default ({
  title,
}: {
  title: string,
}) => (
  <section className="hero is-primary is-bold">
    <div className="hero-head">
      <div className="container">
        <nav className="nav">
          <div className="nav-left">
            <Link
              className="nav-item"
              to="/"
            >
              <span className="icon"><i className="fa fa-arrow-left" /></span>
            </Link>
            <span className="nav-item is-brand title">{title}</span>
          </div>
        </nav>
      </div>
    </div>
  </section>
);
