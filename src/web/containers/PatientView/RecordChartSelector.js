/**
 * Copyright 2016 Yuichiro Tsuchiya
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
