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

import Immutable from 'immutable';
import { createSelector } from 'reselect';
import {
  getIsDBPublic,
  getIsAdmin,
  getUserRoles,
} from './auth';

export const getDformStyles = (state: Object): {[key: string]: List<DformStyle>} =>
  state.dform.styles;

export const getRecordFormStyles = (state: Object): List<Map<string, any>> =>
  state.dform.styles.get('record', Immutable.List([]));

export const getViewableRecordFormStyles = createSelector(
  [getRecordFormStyles, getIsDBPublic, getIsAdmin, getUserRoles],
  (recordFormStyles, isDBPublic, isAdmin, userRoles) => {
    if (isDBPublic || isAdmin) return recordFormStyles;

    return recordFormStyles.filter(style => {
      const requiredRoles = style.get('roles');

      if (!requiredRoles) return true;  // If no role required
      if (!userRoles) return false;  // If a user has no role

      return userRoles.some(role => requiredRoles.includes(role));
    });
  }
);

export const getDefaultRecordFormStyleId = (state: Object): ?number =>
  getViewableRecordFormStyles(state).getIn([0, 'id']);

export const getRecordFormStyleId = (state: Object): ?number =>
  state.patientView.recordFormStyleId || getDefaultRecordFormStyleId(state);

export const getRecordFormStyle = createSelector(
  [getRecordFormStyleId, getViewableRecordFormStyles],
  (recordFormStyleId, recordFormStyles) => {
    const recordFormStyle = recordFormStyles.find(s => s.get('id') === recordFormStyleId);
    if (!recordFormStyle) return null;
    return recordFormStyle.get('style');
  }
);

export const getPatientFormStyle = (state: Object): List<Map<string, any>> =>
  state.dform.styles.getIn(['patient', 0, 'style']);  // TODO とりあえず固定で
