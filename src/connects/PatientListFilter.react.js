/* @flow */

import { connect } from 'react-redux';
import {
  setPatientListFilter,
  setPatientListSortField,
  setPatientListSortOrder,
  setPatientListTimeFilter,
} from '../actions';
import {
  getPatientSortField,
  getPatientSortOrder,
} from '../selectors';

const mapStateToProps = (state) => ({
  filter: state.patientSelect.filter,
  sortBy: getPatientSortField(state),
  sortInAsc: getPatientSortOrder(state),
  filterDate: state.patientSelect.filterDate,
});

const mapDispatchToProps = (dispatch) => ({
  onFilterChange: (newFilter) => dispatch(setPatientListFilter(newFilter)),
  setPatientListSortField: (sortBy: string) => dispatch(setPatientListSortField(sortBy)),
  setPatientListSortOrder: (sortInAsc: boolean) => dispatch(setPatientListSortOrder(sortInAsc)),
  setFilterTime: (date: Moment) => dispatch(setPatientListTimeFilter(date)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
