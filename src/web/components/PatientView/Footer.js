/**
 * Copyright 2016 Yuichiro Tsuchiya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import React from 'react';

export default ({
  onSubmit,
  freeze,
}: {
  onSubmit?: () => void,
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
                disabled={freeze || !onSubmit}
                onClick={e => {
                  e.preventDefault();
                  if (onSubmit) onSubmit();
                }}
              >Submit</button>
            </span>
          </div>
        </nav>
      </div>
    </div>
  </section>
);
