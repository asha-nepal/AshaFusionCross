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

import PayloadAction from './action';

interface SelectActiveRecordPayload {
  id: string,
}
interface SelectActiveRecordAction extends PayloadAction<SelectActiveRecordPayload> {}

interface SetRecordFormStyleIdPayload {
  styleId: string,
}
interface SetRecordFormStyleIdAction extends PayloadAction<SetRecordFormStyleIdPayload> {}

interface SetVisibilityPayload {
  visibility: boolean,
}
interface SetPatientFormVisibilityAction extends PayloadAction<SetVisibilityPayload> {}
interface SetRecordChartVisibilityAction extends PayloadAction<SetVisibilityPayload> {}

interface SetRecordChartTypePayload {
  type: string,
}
interface SetRecordChartTypeAction extends PayloadAction<SetRecordChartTypePayload> {}

export type PatientViewAction =
  SelectActiveRecordAction
  & SetRecordFormStyleIdAction
  & SetPatientFormVisibilityAction
  & SetRecordChartVisibilityAction
  & SetRecordChartTypeAction;
