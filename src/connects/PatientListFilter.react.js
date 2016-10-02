/* @flow */

import { connect } from 'react-redux';
import {
  setPatientListFilter,
  setPatientListSortField,
  setPatientListOrder,
} from '../actions';
import {
  getPatientSortField,
  getPatientSortOrder,
} from '../selectors';

const mapStateToProps = (state) => ({
  filter: state.patientSelect.filter,
  sortBy: getPatientSortField(state),
  sortInAsc: getPatientSortOrder(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFilterChange: (newFilter) => dispatch(setPatientListFilter(newFilter)),
  setPatientListSortField: (sortBy: string) => dispatch(setPatientListSortField(sortBy)),
  setPatientListOrder: (sortInAsc: boolean) => dispatch(setPatientListOrder(sortInAsc)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
