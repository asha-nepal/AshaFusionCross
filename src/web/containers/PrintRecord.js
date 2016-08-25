/* @flow */

import { connect } from 'react-redux';
import {
  getActivePatient,
  selectedActiveRecordSelector,
} from '../../selectors';
import PrintRecord from '../components/PrintRecord';

const mapStateToProps = (state) => ({
  patient: getActivePatient(state),
  record: selectedActiveRecordSelector(state),
});
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(PrintRecord);
