/* @flow */

import { connect } from 'react-redux';
import {
  tableize,
  reduceTable,
} from 'lib/tableizer';
import {
  fetchRecordList,
} from 'actions';

const mapStateToProps = (state) => ({
  columns: state.stats.tableColumns,
  rows: tableize(state.recordList, state.stats.tableRules, ''),
  statsRules: state.stats.statsRules,
  stats: reduceTable(tableize(state.recordList, state.stats.tableRules), state.stats.statsRules),
});

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(fetchRecordList()),
});

export default connect(mapStateToProps, mapDispatchToProps);
