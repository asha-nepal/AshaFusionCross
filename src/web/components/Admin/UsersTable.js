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

import React, { Component } from 'react';

type Props = {
  users: List<Object>,
  fetchUsers: () => void,
};

const UserRow = ({
  user,
}: {
  user: Map<string, any>,
}) => (
  <tr>
    <td>{user.get('name')}</td>
    <td>{user.getIn(['asha', 'roles'], []).join(', ')}</td>
  </tr>
);

export default class extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  props: Props;

  render() {
    const {
      users,
    } = this.props;

    return (
      <div className="box">
        <div className="title">Users</div>
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Roles</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => <UserRow key={i} user={user} />)}
          </tbody>
        </table>
      </div>
    );
  }
}
