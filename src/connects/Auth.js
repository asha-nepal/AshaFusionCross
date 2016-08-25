/* @flow */

import { connect } from 'react-redux';
import {
  requestLogin,
  requestAnonymousLogin,
  requestSignup,
} from '../actions';

const mapStateToProps = (state) => ({
  isDBPublic: state.auth.isDBPublic,
  loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(requestLogin(username, password)),
  anonymousLogin: () => dispatch(requestAnonymousLogin()),
  signup: (username, password) => dispatch(requestSignup(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps);
