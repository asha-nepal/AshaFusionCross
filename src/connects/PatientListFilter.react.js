/* @flow */

import { connect } from 'react-redux';
import {
  setPatientListFilter,
} from '../actions';

const mapStateToProps = (state) => ({
  filter: state.patientSelect.filter,
});

const mapDispatchToProps = (dispatch) => ({
  onFilterChange: (newFilter) => dispatch(setPatientListFilter(newFilter)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
