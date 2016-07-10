/* @flow */

import { connect } from 'react-redux';
import {
  connectPouchDB,
} from '../../actions';

import Settings from '../components/Settings.react';

import {
  getConfig,
} from '../../db';

const mapStateToProps = () => ({
  pouchConfig: getConfig(),
});

const mapDispatchToProps = (dispatch) => ({
  connectPouchDB: (pouchConfig) => dispatch(connectPouchDB(pouchConfig)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
