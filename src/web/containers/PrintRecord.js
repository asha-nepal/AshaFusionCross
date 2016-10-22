/* @flow */

import { connect } from 'react-redux';
import {
  getActivePatient,
  getSelectedActiveRecord,
} from '../../selectors';
import PrintRecord from '../components/PrintRecord';

const mapStateToProps = (state) => ({
  patient: getActivePatient(state),
  record: getSelectedActiveRecord(state),
});
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(PrintRecord);
