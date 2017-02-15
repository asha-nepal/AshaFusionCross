/* @flow */

import { connect } from 'react-redux';
import {
  tableize,
  reduceTable,
} from 'lib/tableizer';
import {
  fetchPouchDocs,
} from '../actions';

const mapStateToProps = (state) => ({
  columns: state.stats.tableColumns,
  rows: tableize(state.recordList, state.stats.tableRules, ''),
  statsRules: state.stats.statsRules,
  stats: reduceTable(tableize(state.recordList, state.stats.tableRules), state.stats.statsRules),
});

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(fetchPouchDocs('records', { prefix: 'record_' })),
});

export default connect(mapStateToProps, mapDispatchToProps);
