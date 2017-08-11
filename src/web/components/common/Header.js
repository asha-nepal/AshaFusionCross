/**
 * Copyright 2017 Yuichiro Tsuchiya
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
import { Link } from 'react-router-dom';

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
