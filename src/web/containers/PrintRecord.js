/**
 * Copyright 2017 Yuichiro Tsuchiya
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
