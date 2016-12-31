/* @flow */

import React, { Component } from 'react';
import { Link } from 'react-router';

type Props = {
  loggedIn: boolean,
  loggedInUser: ?string,
  logout?: () => void,
};

export default class extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      isMenuOpen: false,
    };
  }

  state: {
    isMenuOpen: boolean,
  };

  props: Props;

  render() {
    const {
      loggedIn,
      loggedInUser,
      logout,
    } = this.props;

    return (
      <section className="hero is-primary is-bold">
        <div className="hero-head">
          <div className="container">
            <nav className="nav">
              <div className="nav-left">
                <span className="nav-item is-brand title">ASHA fusion</span>
              </div>

              <span
                className="nav-toggle"
                onClick={e => {
                  e.preventDefault();
                  this.setState({ isMenuOpen: !this.state.isMenuOpen });
                }}
              >
                <span></span>
                <span></span>
                <span></span>
              </span>
              {loggedIn &&
                <div className={`nav-right nav-menu${this.state.isMenuOpen ? ' is-active' : ''}`}>
                  <p className="nav-item">{loggedInUser || '(anonymous user)'}</p>
                  {logout &&
                    <a
                      className="nav-item"
                      onClick={e => {
                        e.preventDefault();
                        logout();
                      }}
                    >Log out</a>
                  }
                  <Link className="nav-item" to="admin">Admin</Link>
                </div>
              }
            </nav>
          </div>
        </div>
      </section>
    );
  }
}
