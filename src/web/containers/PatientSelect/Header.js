/* @flow */

import { connect } from 'react-redux';

import {
  requestLogout,
} from '../../../actions';
import Header from '../../components/PatientSelect/Header';

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
  loggedInUser: state.auth.loggedInUser,
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(requestLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
