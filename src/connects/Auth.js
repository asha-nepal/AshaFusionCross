/* @flow */

import { connect } from 'react-redux';
import {
  requestLogin,
} from '../actions';

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(requestLogin(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps);
