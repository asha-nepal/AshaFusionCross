/* @flow */

import { connect } from 'react-redux';
import {
  tableize,
  reduceTable,
} from 'lib/tableizer';
import {
  fetchRecordList,
} from '../actions';

// tmp
const rules = [
  {
    key: 'height',
    type: 'value_unit',
    unit: 'cm',
  },
  {
    key: 'bp.s',
  },
  {
    key: 'bp.d',
  },
  {
    key: 'symptoms',
  },
  {
    key: '$updated_at',
    type: 'moment',
  },
];

const columns = [
  { key: 'height', name: 'Height (cm)' },
  { key: 'bp.s', name: 'BP/s (mmHg)' },
  { key: 'bp.d', name: 'BP/d (mmHg)' },
  { key: 'symptoms', name: 'Symptoms' },
  { key: '$updated_at', name: 'Updated at' },
];

const statsRules = [
  { key: 'height', type: 'mean' },
  { key: 'symptoms', type: 'mode' },
];

const mapStateToProps = (state) => ({
  columns,
  rows: tableize(state.recordList, rules, ''),
  stats: reduceTable(tableize(state.recordList, rules), statsRules),
});

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(fetchRecordList()),
});

export default connect(mapStateToProps, mapDispatchToProps);
