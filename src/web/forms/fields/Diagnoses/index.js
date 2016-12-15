/* @flow */

import React from 'react';

import { SubformList, ReadonlySubformList } from '../SubformList';
import ICD10Input from './ICD10Input';

export const Diagnoses = (props: Object) => (
  <SubformList
    {...props}
    fields={[
      { field: 'icd10', label: 'ICD10', class: ICD10Input, width: '30%' },
      { field: 'text', label: 'Free description', class: 'textinput', expanded: true },
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
