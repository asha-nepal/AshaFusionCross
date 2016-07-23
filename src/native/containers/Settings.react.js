/* @flow */

import { connect } from 'react-redux';
import {
  connectPouchDB,
} from '../../actions';

import Settings from '../components/Settings.react';

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => ({
  connectPouchDB: () => dispatch(connectPouchDB()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
