/* @flow */

import { connect } from 'react-redux';
import {
  connectPouchDB,
} from '../../actions';

import Settings from '../components/Settings.react';

const mapStateToProps = (state) => ({
  pouchConfig: state.pouchConfig,
});

const mapDispatchToProps = (dispatch) => ({
  connectPouchDB: (pouchConfig) => dispatch(connectPouchDB(pouchConfig)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
