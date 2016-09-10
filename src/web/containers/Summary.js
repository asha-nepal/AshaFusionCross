/* @flow */

import { connect } from 'react-redux';
import {
  fetchRecordList,
} from '../../actions';
import Summary from '../components/Summary';

import { convert } from '../forms/fields/TextUnitInput';

const tablize = (records) => records.map(record => ({
  ...record,
  height: convert(record.height, 'cm'),
  weight: convert(record.weight, 'kg'),
}));

const mapStateToProps = (state) => ({
  records: state.summary.records ? tablize(state.summary.records) : [],
});

const mapDispatchToProps = (dispatch) => ({
  fetchRecords: () => dispatch(fetchRecordList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
