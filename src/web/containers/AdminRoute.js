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
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import {
  getIsAdmin,
} from '../../selectors';

const AdminComponent = ({
  isAdmin,
  location,
  component: Component,
  ...props
}: {
  isAdmin: boolean,
  location: Object,
  component: ReactClass<any>,
}) => (
  isAdmin
    ? <Component {...props} />
    : <Redirect to={{ pathname: '/', from: location }} />
);

const AdminContainer = connect(
  state => ({
    isAdmin: getIsAdmin(state),
  }),
)(AdminComponent);

export default ({ component, ...rest }: { component: React.Component<void, *, *>}) => (
  <Route
    render={props => <AdminContainer component={component} {...props} />
    }
    {...rest}
  />
);
