/**
 * Copyright 2016-2017 Yuichiro Tsuchiya
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

import { connect } from 'react-redux';
import {
  dbConnectRequest,
  requestLogin,
  requestAnonymousLogin,
  requestSignup,
} from '../actions';

const mapStateToProps = (state) => ({
  isDBConnected: !!state.db.instance,
  currentDBConfig: state.db.config,
  isDBPublic: state.auth.isDBPublic,
  loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  connectDB: (config: PouchConfig) => dispatch(dbConnectRequest(config)),
  login: (username, password) => dispatch(requestLogin(username, password)),
  anonymousLogin: () => dispatch(requestAnonymousLogin()),
  signup: (username, password) => dispatch(requestSignup(username, password, true)),
});

export default connect(mapStateToProps, mapDispatchToProps);
