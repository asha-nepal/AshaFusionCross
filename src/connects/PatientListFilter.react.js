/* @flow */

import { connect } from 'react-redux';
import {
  setPatientListFilter,
  setPatientListSortField,
  setPatientListSortOrder,
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
  setPatientListSortOrder: (sortInAsc: boolean) => dispatch(setPatientListSortOrder(sortInAsc)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
