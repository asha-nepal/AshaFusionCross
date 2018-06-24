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

import { SubformList, ReadonlySubformList } from '../SubformList';
import ICD10Input from './ICD10Input';

export const Diagnoses = (props: Object) => (
  <SubformList
    {...props}
    fields={[
      {
        field: 'icd10', label: 'ICD10', class: ICD10Input, subformstyle: { width: '30%' },
      },
      { field: 'text', label: 'Free description', class: 'textinput' },
    ]}
  />
);

export const ReadonlyDiagnoses = ({
  value,
}: {
  value: Array<Object | string>
  // FIXME: stringは本当は消したいが，flowの制約でstringを付加．caller, calleeの関係を考慮すれば要らないことは分かるはず．
}) => (
  <ReadonlySubformList
    values={value}
    fields={[
      { field: 'icd10', class: ICD10Input },
      { field: 'text', class: 'textinput' },
    ]}
  />
);
