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

import React from 'react';
import { connect } from 'react-redux';
import {
  setRecordChartVisibility,
} from '../../../actions';

const mapStateToProps = (state) => ({
  visibility: state.patientView.recordChartVisibility,
});
const mapDispatchToProps = (dispatch) => ({
  setVisibility: (visibility) => dispatch(setRecordChartVisibility(visibility)),
});

const RecordChartToggleComponent = ({
  visibility,
  setVisibility,
}: {
  visibility: boolean,
  setVisibility: (visibility: boolean) => void,
}) => (
  <button
    className={visibility ? 'button is-primary' : 'button'}
    onClick={e => {
      e.preventDefault();
      setVisibility(!visibility);
    }}
  ><i className="fa fa-line-chart" /></button>
);

export default connect(mapStateToProps, mapDispatchToProps)(RecordChartToggleComponent);
