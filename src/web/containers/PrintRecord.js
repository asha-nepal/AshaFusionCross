/* @flow */

import { connect } from 'react-redux';
import {
  activePatientSelector,
  selectedActiveRecordSelector,
} from '../../selectors';
import PrintRecord from '../components/PrintRecord';

const mapStateToProps = (state) => ({
  patient: activePatientSelector(state),
  record: selectedActiveRecordSelector(state),
});
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(PrintRecord);
