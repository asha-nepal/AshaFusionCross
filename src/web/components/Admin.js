/* @flow */

import React from 'react';
import { Link } from 'react-router';
import SignupForm from '../containers/forms/SignupForm';

export default ({
  signup,
}: {
  signup: (username: string, password: string) => void,
}) => (
  <div>
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
              <span className="nav-item is-brand title">Admin</span>
            </div>
          </nav>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <SignupForm
          signup={signup}
        />
      </div>
    </section>
  </div>
);
