/**
 * Copyright 2017 Yuichiro Tsuchiya
 * Copyright 2017 Yuguan Xing
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import { connect } from 'react-redux';
import type Moment from 'moment';
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
  setFilterDate: (date: {startDate: Moment,
                         endDate: Moment}) => dispatch(setPatientListTimeFilter(date)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
