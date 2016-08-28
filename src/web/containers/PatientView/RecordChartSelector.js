/* @flow */

import { connect } from 'react-redux';
import {
  setRecordChartVisibility,
  setRecordChartType,
} from '../../../actions';
import RecordChartSelector from '../../components/PatientView/RecordChartSelector';

const mapStateToProps = (state) => ({
  visibility: state.patientView.recordChartVisibility,
  type: state.patientView.recordChartType,
});
const mapDispatchToProps = (dispatch) => ({
  setVisibility: (visibility) => dispatch(setRecordChartVisibility(visibility)),
  setType: (type) => dispatch(setRecordChartType(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordChartSelector);
