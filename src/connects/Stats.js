/**
 * Copyright 2017 Yuichiro Tsuchiya
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
import {
  tableize,
  reduceTable,
} from 'lib/tableizer';
import {
  fetchRecordList,
  setStatsDate,
} from 'actions';
import {
  getRecordListForStats,
} from 'selectors';
import type { Moment } from 'moment';

const mapStateToProps = (state) => {
  const recordList = getRecordListForStats(state);

  return {
    columns: state.stats.tableColumns,
    rows: tableize(recordList, state.stats.tableRules, ''),
    statsRules: state.stats.statsRules,
    stats: reduceTable(tableize(recordList, state.stats.tableRules), state.stats.statsRules),
    date: state.stats.date,
  };
};

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(fetchRecordList()),
  setDate: (date: Moment) => dispatch(setStatsDate(date)),
});

export default connect(mapStateToProps, mapDispatchToProps);
