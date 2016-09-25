/* @flow */

import React from 'react';

export default ({
  onSubmit,
  freeze,
}: {
  onSubmit: () => void,
  freeze: boolean,
}) => (
  <section className="hero footer-fixed">
    <div className="hero-head">
      <div className="container">
        <nav className="nav">
          <div className="nav-left">
            <span className="nav-item">
              <button
                className="button is-primary"
                disabled={freeze}
                onClick={e => {
                  e.preventDefault();
                  onSubmit();
                }}
              >Submit</button>
            </span>
          </div>
        </nav>
      </div>
    </div>
  </section>
);
