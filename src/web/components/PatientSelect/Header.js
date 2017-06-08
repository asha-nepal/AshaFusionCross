/* @flow */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  isLoggedIn: boolean,
  loggedInUser: ?string,
  isAdmin: boolean,
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
      isLoggedIn,
      loggedInUser,
      isAdmin,
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
              {isLoggedIn &&
                <div className={`nav-right nav-menu${this.state.isMenuOpen ? ' is-active' : ''}`}>
                  <Link className="nav-item" to="stats">Stats</Link>
                  <span className="nav-item">|</span>

                  {isAdmin && <Link className="nav-item" to="admin">Admin</Link>}
                  {isAdmin && <span className="nav-item">|</span>}

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
                </div>
              }
            </nav>
          </div>
        </div>
      </section>
    );
  }
}
