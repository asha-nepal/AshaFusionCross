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
import type { Moment } from 'moment';

const mapStateToProps = (state) => ({
  columns: state.stats.tableColumns,
  rows: tableize(state.recordList, state.stats.tableRules, ''),
  statsRules: state.stats.statsRules,
  stats: reduceTable(tableize(state.recordList, state.stats.tableRules), state.stats.statsRules),
  date: state.stats.date,
});

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(fetchRecordList()),
  setDate: (date: Moment) => dispatch(setStatsDate(date)),
});

export default connect(mapStateToProps, mapDispatchToProps);
