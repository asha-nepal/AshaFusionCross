/* @flow */

import { connect } from 'react-redux';
import {
  requestLogin,
  requestSignup,
} from '../actions';

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(requestLogin(username, password)),
  signup: (username, password) => dispatch(requestSignup(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps);
