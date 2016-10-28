/* @flow */

import React from 'react';

import { SubformList, ReadonlySubformList } from '..';
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
  value: Array<Object>
}) => (
  <ReadonlySubformList
    values={value}
    fields={[
      { field: 'icd10', class: ICD10Input },
      { field: 'text', class: 'textinput' },
    ]}
  />
);
