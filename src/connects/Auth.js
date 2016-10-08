/* @flow */

import { connect } from 'react-redux';
import {
  dbConnectRequest,
  requestLogin,
  requestAnonymousLogin,
  requestSignup,
} from '../actions';

const mapStateToProps = (state) => ({
  isDBConnected: !!state.db.instance,
  pouchConfig: state.pouchConfig,
  isDBPublic: state.auth.isDBPublic,
  loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  connectDB: (config: PouchConfig) => dispatch(dbConnectRequest(config)),
  login: (username, password) => dispatch(requestLogin(username, password)),
  anonymousLogin: () => dispatch(requestAnonymousLogin()),
  signup: (username, password) => dispatch(requestSignup(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps);
