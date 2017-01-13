/* @flow */

import { connect } from 'react-redux';

import {
  requestLogout,
} from '../../../actions';
import {
  getIsLoggedIn,
  getLoggedInUser,
  getIsAdmin,
} from '../../../selectors';
import Header from '../../components/PatientSelect/Header';

const mapStateToProps = (state) => ({
  isLoggedIn: getIsLoggedIn(state),
  loggedInUser: getLoggedInUser(state),
  isAdmin: getIsAdmin(state),
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(requestLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
