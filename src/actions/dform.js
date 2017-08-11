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

export const DFORM_STYLE_INSERT = 'DFORM_STYLE_INSERT';
export const dformStyleInsert = (
  group: string,
  id: string,
  parentPath: string,
  index: number,
  field: FormField,
): DformStyleInsertAction => ({
  type: DFORM_STYLE_INSERT,
  payload: {
    group,
    id,
    parentPath,
    index,
    field,
  },
});

export const DFORM_STYLE_UPDATE = 'DFORM_STYLE_UPDATE';
export const dformStyleUpdate = (
  group: string,
  id: string,
  parentPath: string,
  index: number,
  field: FormField,
  merge: boolean = false,
): DformStyleUpdateAction => ({
  type: DFORM_STYLE_UPDATE,
  payload: {
    group,
    id,
    parentPath,
    index,
    field,
    merge,
  },
});

export const DFORM_STYLE_DELETE = 'DFORM_STYLE_DELETE';
export const dformStyleDelete = (
  group: string,
  id: string,
  parentPath: string,
  index: number,
): DformStyleDeleteAction => ({
  type: DFORM_STYLE_DELETE,
  payload: {
    group,
    id,
    parentPath,
    index,
  },
});
