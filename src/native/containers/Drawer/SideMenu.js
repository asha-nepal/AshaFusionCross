/* @flow */

import { connect } from 'react-redux';
import {
  requestLogout,
  dbDisconnectRequest,
} from '../../../actions';
import SideMenu from '../../components/Drawer/SideMenu';

const mapStateToProps = null;
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(requestLogout()),
  disconnect: () => dispatch(dbDisconnectRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
