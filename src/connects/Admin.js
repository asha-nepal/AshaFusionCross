/* @flow */

import { connect } from 'react-redux';

import {
  requestSignup,
} from '../actions';

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => ({
  signup: (username, password) => dispatch(requestSignup(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps);
