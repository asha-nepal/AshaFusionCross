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
  component: React.Component<void, *, *>,
}) => (
  isAdmin
  ? <Component {...props} />
  : <Redirect to={{ pathname: '/', from: location }} />
);

const AdminContainer = connect(
  state => ({
    isAdmin: getIsAdmin(state),
  })
)(AdminComponent);

export default ({ component, ...rest }: { component: React.Component<void, *, *>}) => (
  <Route
    render={props =>
      <AdminContainer component={component} {...props} />
    }
    {...rest}
  />
);
