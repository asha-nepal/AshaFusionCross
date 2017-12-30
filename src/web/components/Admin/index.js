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
import Header from '../common/Header';
import SignupForm from '../../containers/forms/SignupForm';
import UsersTable from '../../containers/Admin/UsersTable';

export default ({
  signup,
}: {
  signup: (username: string, password: string) => void,
}) => (
  <div>
    <Header
      brand={[
        <Link
          key="back"
          className="navbar-item"
          to="/"
        >
          <span className="icon"><i className="fa fa-arrow-left" /></span>
        </Link>,
        <span
          key="title"
          className="is-size-3"
        >
          Admin
        </span>,
      ]}
    />

    <section className="section">
      <div className="container">
        <SignupForm
          signup={signup}
        />
      </div>
    </section>

    <section className="section">
      <div className="container">
        <UsersTable />
      </div>
    </section>
  </div>
);
