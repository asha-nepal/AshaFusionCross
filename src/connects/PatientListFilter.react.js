/* @flow */

import { connect } from 'react-redux';
import {
  setPatientListFilter,
  setPatientListOrder,
} from '../actions';
import {
  sortInAscSelector,
} from '../selectors';

const mapStateToProps = (state) => ({
  filter: state.patientSelect.filter,
  sortInAsc: sortInAscSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFilterChange: (newFilter) => dispatch(setPatientListFilter(newFilter)),
  setPatientListOrder: (sortInAsc: boolean) => dispatch(setPatientListOrder(sortInAsc)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
