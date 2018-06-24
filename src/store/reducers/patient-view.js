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

import {
  SELECT_ACTIVE_RECORD,
  SET_RECORD_FORM_STYLE_ID,
  SET_PATIENT_FORM_VISIBILITY,
  SET_RECORD_CHART_VISIBILITY,
  SET_RECORD_CHART_TYPE,
} from '../../actions';

const initialState = {
  selectedActiveRecordId: null,
  recordFormStyleId: null,
  patientFormVisibility: false,
  recordChartVisibility: false,
  recordChartType: null,
};

export default function (
  state: Object = initialState,
  action: PatientViewAction,
): Object {
  switch (action.type) {
    case SELECT_ACTIVE_RECORD:
      return Object.assign({}, state, {
        selectedActiveRecordId: action.payload.id,
      });

    case SET_RECORD_FORM_STYLE_ID:
      return Object.assign({}, state, {
        recordFormStyleId: action.payload.styleId,
      });

    case SET_PATIENT_FORM_VISIBILITY:
      return Object.assign({}, state, {
        patientFormVisibility: action.payload.visibility,
      });

    case SET_RECORD_CHART_VISIBILITY:
      return Object.assign({}, state, {
        recordChartVisibility: action.payload.visibility,
      });

    case SET_RECORD_CHART_TYPE:
      return Object.assign({}, state, {
        recordChartType: action.payload.type,
      });

    default:
      return state;
  }
}
