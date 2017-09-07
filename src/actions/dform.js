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

export const DFORM_STYLE_FIELD_INSERT = 'DFORM_STYLE_FIELD_INSERT';
export const insertDformStyleField = (
  group: string,
  id: string,
  parentPath: string,
  index: number,
  field: FormField,
): insertDformStyleFieldAction => ({
  type: DFORM_STYLE_FIELD_INSERT,
  payload: {
    group,
    id,
    parentPath,
    index,
    field,
  },
});

export const DFORM_STYLE_FIELD_UPDATE = 'DFORM_STYLE_FIELD_UPDATE';
export const updateDformStyleField = (
  group: string,
  id: string,
  parentPath: string,
  index: number,
  field: FormField,
  merge: boolean = false,
): updateDformStyleFieldAction => ({
  type: DFORM_STYLE_FIELD_UPDATE,
  payload: {
    group,
    id,
    parentPath,
    index,
    field,
    merge,
  },
});

export const DFORM_STYLE_FIELD_REMOVE = 'DFORM_STYLE_FIELD_REMOVE';
export const removeDformStyleField = (
  group: string,
  id: string,
  parentPath: string,
  index: number,
): removeDformStyleFieldAction => ({
  type: DFORM_STYLE_FIELD_REMOVE,
  payload: {
    group,
    id,
    parentPath,
    index,
  },
});

export const DFORM_STYLE_FIELD_MOVE = 'DFORM_STYLE_FIELD_MOVE';
export const moveDformStyleField = (
  group: string,
  id: string,
  fromParentPath: string,
  fromIndex: number,
  toParentPath: string,
  toIndex: number,
): moveDformStyleFieldAction => ({
  type: DFORM_STYLE_FIELD_MOVE,
  payload: {
    group,
    id,
    fromParentPath,
    fromIndex,
    toParentPath,
    toIndex,
  },
});

export const DFORM_STYLE_FORM_ADD = 'DFORM_STYLE_FORM_ADD';
export const dformStyleFormAdd = (
  group: string,
  id: string,
  label: string,
) => ({
  type: DFORM_STYLE_FORM_ADD,
  payload: {
    group,
    id,
    label,
  },
});

export const DFORM_STYLE_FORM_SET = 'DFORM_STYLE_FORM_SET';
export const setDformStyleForm = (
  group: string,
  id: string,
  label: string,
  style: DformStyle,
  rev: string,
) => ({
  type: DFORM_STYLE_FORM_SET,
  payload: { group, id, label, style, rev },
});

export const DFORM_STYLES_FETCH = 'DFORM_STYLES_FETCH';
export const fetchDformStyles = () => ({
  type: DFORM_STYLES_FETCH,
});

export const DFORM_STYLES_PUT = 'DFORM_STYLES_PUT';
export const putDformStyles = () => ({
  type: DFORM_STYLES_PUT,
});
